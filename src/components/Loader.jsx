import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    let timer;

    const tick = () => {
      current = Math.min(100, current + Math.random() * 28 + 18);
      setPct(Math.floor(current));
      if (current >= 100) {
        setTimeout(() => {
          setHidden(true);
          setTimeout(() => onDone?.(), 420);
        }, 120);
        return;
      }
      timer = setTimeout(tick, 40 + Math.random() * 50);
    };

    timer = setTimeout(tick, 80);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      animate={hidden ? { y: "-100%" } : {}}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loader-inner">
        <div className="loader-name">
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            Umesh Budhathoki
          </motion.span>
        </div>
        <div className="loader-bar">
          <span style={{ width: `${pct}%`, transition: "width 0.15s ease" }} />
        </div>
        <div className="loader-pct">{pct}%</div>
      </div>
    </motion.div>
  );
}
