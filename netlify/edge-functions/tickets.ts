import { Config, Context } from "@netlify/edge-functions";
import { GoogleSpreadsheet } from "google-spreadsheet";
import QRCode from "qrcode";

//For funky google stuff, see below
// -> https://stackoverflow.com/questions/38949318/google-sheets-api-returns-the-caller-does-not-have-permission-when-using-serve ([403])

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function parseFromData(formData: FormData) {
  const parsed = {};

  for (const [key, value] of formData.entries()) {
    // Handle multiple entries for the same key (e.g., checkboxes)
    if (parsed[key]) {
      // Convert existing value to an array if it's not already
      parsed[key] = Array.isArray(parsed[key]) ? parsed[key] : [parsed[key]];

      parsed[key].push(value);
    } else {
      parsed[key] = value;
    }
  }

  return parsed;
}

function pemToBuffer(pem: string): Uint8Array {
  const base64 = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");

  const binary = atob(base64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer;
}

//not sure if caching the token in-memory is valid, do edge functions persist ?
let cachedToken: { access_token: string; expires_at: number } | null = null;

async function getAccessToken(privateKey: string, clientEmail: string) {
  const now = Math.floor(Date.now() / 1000);

  // Check if a valid token exists
  if (cachedToken && cachedToken.expires_at > now) {
    return cachedToken.access_token;
  }

  // Token generation process
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const claims = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaims = base64UrlEncode(JSON.stringify(claims));

  const signatureInput = `${encodedHeader}.${encodedClaims}`;
  const encoder = new TextEncoder();

  const keyBuffer = pemToBuffer(privateKey);

  const keyData = await crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    keyData,
    encoder.encode(signatureInput)
  );

  const encodedSignature = base64UrlEncode(
    String.fromCharCode(...new Uint8Array(signature))
  );

  const jwt = `${signatureInput}.${encodedSignature}`;

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error(`Token request failed: ${errorText}`);
  }

  const token = await tokenResponse.json();

  if (!token.access_token) {
    throw new Error("No access token received");
  }

  // Cache the token with expiration time
  cachedToken = {
    access_token: token.access_token,
    expires_at: now + 3600, // 1 hour validity
  };

  return token.access_token;
}

export default async (request: Request, context: Context) => {
  try {
    const privateKey = Netlify.env
      .get("GOOGLE_PRIVATE_KEY")
      ?.replace(/\\n/g, "\n");

    if (!privateKey) {
      throw new Error("Private key is required");
    }
    const clientEmail = Netlify.env.get("GOOGLE_CLIENT_EMAIL");

    if (!clientEmail) {
      throw new Error("Client email is required");
    }

    const accessToken = await getAccessToken(privateKey, clientEmail);

    const doc = new GoogleSpreadsheet(
      "1RJwNXoNn0BClI7vO9fbVFoxKTLZunN3EhKW4hL53W1o",
      { token: accessToken }
    );

    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["sales"];

    const data = await request.json();

    const saleId = crypto.randomUUID();

    //TODO ensure unique productId productType email combo
    sheet.addRow({ ...data, saleId });

    const qrCode = await QRCode.toDataURL(saleId);

    return new Response(JSON.stringify({ qrCode }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config: Config = { path: "/ticket" };
