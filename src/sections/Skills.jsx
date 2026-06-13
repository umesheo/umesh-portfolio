import Reveal from "../components/Reveal";
import { skillGroups } from "../data/content";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Toolbox</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            Technologies I <span className="grad">work with.</span>
          </h2>
        </Reveal>

        <div className="skills-grid">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} variant="scale" delay={Math.min(i * 0.08, 0.25)}>
              <div className="skill-card">
                <h4>
                  {g.title}
                  <span className="count">{g.items.length}</span>
                </h4>
                <div className="skill-chips">
                  {g.items.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
