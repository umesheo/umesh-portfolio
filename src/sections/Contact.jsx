import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { profile } from "../data/content";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal variant="scale">
          <div className="contact-inner">
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Contact
            </span>
            <h2>
              Let's build <span className="grad">something great.</span>
            </h2>
            <p>
              Have a project in mind, a role to fill, or just want to say kia ora?
              I'm always happy to chat.
            </p>

            <div className="contact-actions">
              <Magnetic>
                <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                  Email me <span className="arrow">↗</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  className="btn btn-ghost"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Magnetic>
            </div>

            <div className="contact-meta">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <span>{profile.location}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
