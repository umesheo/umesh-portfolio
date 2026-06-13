import { profile } from "../data/content";
import { scrollTo } from "../components/SmoothScroll";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="name">Umesh Budhathoki</div>
          <div className="copy">
            © {year} · Designed & built with React + Three.js
          </div>
        </div>

        <div className="footer-socials">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>

        <button
          className="to-top"
          onClick={() => scrollTo(0)}
          aria-label="Back to top"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
