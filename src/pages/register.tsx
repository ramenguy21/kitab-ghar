import { Link, useParams } from "wouter";
import HomeLayout from "../layouts/home";
import { useEvents } from "../components/contexts/events";
import { ChangeEvent, FormEvent, useState } from "react";

function Registration() {
  const { id } = useParams();
  const { getEventById } = useEvents();

  const event = getEventById!(id || "");

  //return if no valid event or id landed them on this page
  if (!id || !event) {
    return (
      <div>
        <h3>Whoops, looks like you landed on the wrong page</h3>
        <p>No worries, go back by clicking on this link</p>
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded bg-brand-pink text-white"
        >
          Go back
        </button>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    productId: id,
    productType: "ticket",
    email: "",
    name: "",
    qty: 1,
    payment: "",
  });

  const [qrCode, setQrCode] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFormChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    fetch("/ticket", { method: "POST", body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((data) => {
        setQrCode(data.qrCode);
        setIsSubmitting(false);
      })
      .catch((err) => console.error("Error getting ticket: ", err));
  }

  function downloadQrCode() {
    if (qrCode) {
      const link = document.createElement("a");
      link.href = qrCode;
      link.download = "kitab-ghar-event-ticket.png";
      link.click();
    }
  }

  return (
    <HomeLayout>
      <div className="my-5 mx-10 md:mx-64">
        {qrCode.length <= 1 ? (
          <>
            <h1 className="text-4xl my-2 text-center font-bold">
              Registering for <br />
              {event?.name}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col m-auto px-5">
              <div className="flex flex-col my-2">
                <label htmlFor="email">Email</label>
                <input
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="p-2 bg-brand-pink rounded text-white"
                  id="email"
                  placeholder="test@example.com"
                />
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="name">Name</label>
                <input
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="p-2 bg-brand-pink rounded text-white"
                  id="name"
                  placeholder="Your full name here"
                />
              </div>
              <div className="flex justify-around">
                <div className="flex flex-col my-2">
                  <label htmlFor="qty">Quantity</label>
                  <input
                    onChange={handleFormChange}
                    value={formData.qty}
                    className="p-2 bg-brand-pink rounded text-white"
                    type="number"
                    id="qty"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label
                    className="p-2 m-4 bg-brand-pink text-white rounded-lg cursor-pointer ransition-shadow duration-300 hover:shadow-[8px_8px_0px_rgba(0.8,0.8,0.8,0.5)]"
                    htmlFor="payment"
                  >
                    Upload Receipt
                  </label>
                  <input
                    value={formData.payment}
                    onChange={handleFormChange}
                    required
                    className="hidden"
                    type="file"
                    id="payment"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="self-end p-2 bg-brand-dark_green text-white rounded font-bold"
              >
                {!isSubmitting ? "Get dat thang" : "Getting dat thang"}
              </button>
            </form>
          </>
        ) : (
          <div className="m-auto text-center my-4">
            <h4 className="text-xl">
              Sweet, <b>you're in</b>, here's your ticket, simply show up and
              scan the code below at our entrance
            </h4>
            <img className="m-auto" src={qrCode} alt="ticket qr code" />
            <div className="flex flex-col space-y-2">
              <button
                onClick={downloadQrCode}
                className="bg-brand-pink p-2 text-white rounded"
              >
                Save Code
              </button>
              <Link to="/">Ghar Chalo</Link>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default Registration;
