import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const tick = () => {
      current += Math.random() * 16 + 6;
      if (current >= 100) {
        current = 100;
        setPct(100);
        setTimeout(() => {
          setHidden(true);
          setTimeout(() => onDone?.(), 700);
        }, 350);
        return;
      }
      setPct(Math.floor(current));
      setTimeout(tick, Math.random() * 160 + 80);
    };
    const start = setTimeout(tick, 250);
    return () => clearTimeout(start);
  }, [onDone]);

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      animate={hidden ? { y: "-100%" } : {}}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loader-inner">
        <div className="loader-name">
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Umesh Budhathoki
          </motion.span>
        </div>
        <div className="loader-bar">
          <span style={{ width: `${pct}%`, transition: "width 0.3s ease" }} />
        </div>
        <div className="loader-pct">{pct}%</div>
      </div>
    </motion.div>
  );
}
