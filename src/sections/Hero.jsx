import { motion } from "framer-motion";
import HeroScene from "../three/HeroScene";
import Magnetic from "../components/Magnetic";
import { profile } from "../data/content";
import { scrollTo } from "../components/SmoothScroll";

const lineVariant = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: 0,
    transition: { duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.7 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) scrollTo(el);
  };

  return (
    <section className="hero" id="hero">
      <HeroScene />
      <div className="hero-grain" />

      <div className="hero-inner">
        <div className="container">
          <motion.div custom={0} variants={fade} initial="hidden" animate="show">
            <span className="hero-status">
              <span className="pulse" />
              Available for new projects · {profile.location}
            </span>
          </motion.div>

          <h1>
            <span className="line">
              <motion.span
                style={{ display: "inline-block" }}
                custom={0}
                variants={lineVariant}
                initial="hidden"
                animate="show"
              >
                Business Systems
              </motion.span>
            </span>
            <span className="line">
              <motion.span
                style={{ display: "inline-block" }}
                custom={1}
                variants={lineVariant}
                initial="hidden"
                animate="show"
                className="grad"
              >
                Developer
              </motion.span>
            </span>
            <span className="line">
              <motion.span
                style={{ display: "inline-block" }}
                custom={2}
                variants={lineVariant}
                initial="hidden"
                animate="show"
              >
                & Analyst.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero-sub"
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
          >
            Hi, I'm <strong>Umesh</strong> — a full-stack developer at{" "}
            <strong>Buller District Council</strong>. Expertise in web, mobile and
            cloud systems that turn complex problems into clean, usable products.
          </motion.p>

          <motion.div
            className="hero-actions"
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
          >
            <Magnetic>
              <button className="btn btn-primary" onClick={() => go("projects")}>
                View my work
                <span className="arrow">↗</span>
              </button>
            </Magnetic>
            <Magnetic>
              <button className="btn btn-ghost" onClick={() => go("contact")}>
                Get in touch
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="mouse" />
        Scroll
      </motion.div>
    </section>
  );
}
