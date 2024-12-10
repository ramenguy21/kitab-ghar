import HomeLayout from "../layouts/home";

// who we are.
function About() {
  return (
    <HomeLayout>
      <div className="mx-10 md:mx-64 my-5">
        <p className="italic my-2">
          Kitab Ghar is an entirely free, citizen-funded public library,
          situated in Lahore and Karachi.{" "}
        </p>
        <div className="my-2">
          <p>
            We are open <strong>Seven days a week</strong>, from{" "}
            <strong>11am to 8pm.</strong>
          </p>
          <p>
            For regular visitors, we offer <strong>free Wi-Fi</strong> and{" "}
            <strong>free mineral water</strong>. Additionally, we are able to
            design tailor-made services for our monthly patrons or otherwise
            one-time users.
          </p>
        </div>
        <h2 className="text-xl my-2">
          <strong>Organization Ethos</strong>
        </h2>
        <p>
          At Kitab Ghar, we challenge conventional models of funding and
          sustainability. Our core belief is that{" "}
          <strong>citizens can generate value</strong> by providing essential
          services—like libraries—without reliance on state institutions, large
          corporations, or imperialist funding. We see this as an{" "}
          <strong>economic proposition</strong> rooted in community building and
          self-sufficiency.
        </p>
        <p>
          At its core, Kitab Ghar operates on a{" "}
          <strong>circular economic model</strong>:{" "}
        </p>
        <p>
          <strong>
            The raw material (community involvement, education, and culture) is
            also the product.
          </strong>{" "}
        </p>
        <p>To learn more or become a monthly patron, please learn more here.</p>
        <h2 className="my-2 text-xl">
          <strong>Programming Ethos</strong>
        </h2>
        <p>
          <strong>2024-2025</strong>
        </p>
        <ul className="list-disc">
          <li>
            A library that educates and holds space for radical histories,
            alternative to the ones that are offered to us by the state and its
            admiring institutions.{" "}
          </li>
          <li>
            The narratives and histories we offer to the public will be through
            the works and stories of local people – those who are
            extra-marginalized will always be centered.{" "}
          </li>
          <li>
            We will engage critically with issues that threaten our collective
            freedom and we will not compromise on the quality of materials and
            ideas we present to our audiences.{" "}
          </li>
          <li>
            Our programming will reflect existing conversations but will not be
            a repetition of mainstream work (nuance and preciseness will be
            integral).{" "}
          </li>
          <li>
            We will build sustainable relationships with other communities and
            learning organizations to support and build on the work they are
            doing.{" "}
          </li>
          <li>
            Our work will attempt to fill the silences in our archives;
            especially with regards to topics like state violence, community
            resistance, indigenous histories and protest memory.{" "}
          </li>
          <li>
            Reflecting our collaborative spirit, our programming will think
            through this idea as we build our space:{" "}
            <ul>
              <li>
                Are there topics we should never publicly explore? Where are the
                places we might detract attention from more worthy voices
                because of the way celebrity culture works? Are we using our
                privileges without clear intention? Is oppression being
                exploited?{" "}
              </li>
              <li>
                <em>
                  These words and ideas emerge from the writer and activist
                  Adrienne Maree Brown.
                </em>{" "}
              </li>
            </ul>
          </li>
          <li>
            We will always welcome critique, advice and input from our
            community, as long as it respects our labor and values our intent
            and efforts. But we will not welcome criticism for the sake of
            criticism.{" "}
          </li>
          <li>We reject all binaries of good and bad. </li>
          <li>
            Lastly, we will use any and all opportunities to celebrate and
            spread joy amidst the shitshow.
          </li>
        </ul>
      </div>
    </HomeLayout>
  );
}

export default About;
