const words = [
  "IT Leadership",
  "Cybersecurity",
  "Business Transformation",
  "AI & Automation",
  "Infrastructure & Networks",
  "GIS & Information Systems",
  "Business Continuity",
];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>
          {row.map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </span>
        <span>
          {row.map((w, i) => (
            <span key={`b-${i}`}>{w}</span>
          ))}
        </span>
      </div>
    </div>
  );
}
