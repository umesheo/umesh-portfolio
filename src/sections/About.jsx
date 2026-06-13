import { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import { profile, education } from "../data/content";

function CountUp({ value }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const num = parseInt(value, 10);
    if (Number.isNaN(num)) {
      setDisplay(value);
      return;
    }
    const suffix = value.replace(/[0-9]/g, "");
    let started = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const duration = 1400;
            const start = performance.now();
            const step = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(Math.floor(eased * num) + suffix);
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal>
          <span className="eyebrow">About</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            Engineer at heart, <span className="grad">problem-solver</span> by
            craft.
          </h2>
        </Reveal>

        <div className="about-grid with-portrait">
          <Reveal variant="scale" delay={0.08} className="about-portrait">
            <div className="about-portrait-glow" />
            <div className="about-portrait-frame">
              <img src="/umesh.png" alt="Portrait of Umesh Budhathoki" />
            </div>
            <span className="about-portrait-tag">
              <span className="pdot" />
              Umesh · {profile.location}
            </span>
          </Reveal>

          <div className="about-text">
            <Reveal delay={0.12}>
              <p>{profile.summary}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="secondary">{profile.about}</p>
            </Reveal>
          </div>
        </div>

        <div className="about-cards">
          <Reveal variant="scale" delay={0.05}>
            <div className="about-card">
              <h4>Education</h4>
              <div style={{ marginTop: 14 }}>
                {education.map((e) => (
                  <div className="edu-item" key={e.degree}>
                    <div className="deg">{e.degree}</div>
                    <div className="school">{e.school}</div>
                    <span className="grade">{e.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal variant="scale" delay={0.13}>
            <div className="about-card">
              <h4>Currently</h4>
              <div style={{ marginTop: 14 }}>
                <div className="deg" style={{ fontFamily: "var(--font-display)" }}>
                  {profile.role}
                </div>
                <div className="school">{profile.company}</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="stats">
          {profile.stats.map((s, i) => (
            <Reveal key={s.label} variant="up" delay={i * 0.08}>
              <div className="stat">
                <div className="num">
                  <CountUp value={s.value} />
                </div>
                <div className="lab">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
