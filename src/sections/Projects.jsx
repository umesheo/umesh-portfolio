import Reveal from "../components/Reveal";
import { projects } from "../data/content";

function Visual({ p }) {
  if (p.visualType === "poster") {
    return (
      <div className="proj-visual poster">
        <img src={p.image} alt={`${p.title} overview`} loading="lazy" />
      </div>
    );
  }
  if (p.image) {
    return (
      <div className="proj-visual phones">
        <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" />
        {p.imageAlt && (
          <img src={p.imageAlt} alt={`${p.title} screenshot`} loading="lazy" />
        )}
      </div>
    );
  }
  return (
    <div className="proj-visual">
      <div className="proj-mock">
        <div className="glyph">{p.title.split(" ")[0]}</div>
        {p.href && (
          <div className="url">{p.href.replace(/^https?:\/\//, "")}</div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Selected Work</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            Things I've <span className="grad">designed & shipped.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lead">
            From native macOS utilities to community mobile apps and enterprise
            web platforms — a selection of products I've built end to end.
          </p>
        </Reveal>

        <div className="projects-grid">
          {projects.map((p, i) => {
            const Wrapper = p.href ? "a" : "div";
            const wrapperProps = p.href
              ? { href: p.href, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <Reveal key={p.title} variant="up" delay={Math.min(i * 0.06, 0.2)}>
                <Wrapper
                  {...wrapperProps}
                  className="proj"
                  style={{ "--p-accent": p.accent }}
                >
                  <div className="proj-info">
                    <div className="proj-top">
                      <span>{p.category}</span>
                      <span className="yr">{p.year}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <div className="sub">{p.subtitle}</div>
                    <p className="desc">{p.description}</p>
                    <div className="proj-tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    {p.href ? (
                      <span className="proj-link">
                        Visit live site <span className="arrow">↗</span>
                      </span>
                    ) : (
                      <span className="proj-link">
                        Case study <span className="arrow">↗</span>
                      </span>
                    )}
                  </div>
                  <Visual p={p} />
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
