import Reveal from "../components/Reveal";
import { experiences } from "../data/content";

export default function Experience() {
  return (
    <section className="section" id="work">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Career</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            Where I've <span className="grad">made an impact.</span>
          </h2>
        </Reveal>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <Reveal key={`${exp.company}-${exp.role}`} delay={Math.min(i * 0.05, 0.2)}>
              <article className="tl-item">
                <div className="tl-meta">
                  <div className="period">{exp.period}</div>
                  <div className="loc">{exp.location}</div>
                </div>
                <div className="tl-body">
                  <h3 className="role">{exp.role}</h3>
                  <div className="co">{exp.company}</div>
                  <ul className="tl-points">
                    {exp.points.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
