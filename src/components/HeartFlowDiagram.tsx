export function HeartFlowDiagram() {
  return (
    <div className="heart-diagram" aria-label="תרשים זרימת דם בלב">
      <h3>מסלול הדם בלב</h3>
      <svg viewBox="0 0 620 460" role="img" aria-labelledby="heart-title heart-desc">
        <title id="heart-title">תרשים סכמטי של הלב</title>
        <desc id="heart-desc">צד ימין שולח דם לריאות וצד שמאל שולח דם לגוף.</desc>
        <defs>
          <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2364aa" />
          </marker>
          <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#c23b3b" />
          </marker>
        </defs>
        <rect x="150" y="95" width="320" height="260" rx="44" fill="#fff7f0" stroke="#374151" strokeWidth="4" />
        <line x1="310" y1="100" x2="310" y2="352" stroke="#374151" strokeWidth="5" />
        <rect x="180" y="125" width="100" height="76" rx="18" fill="#dbeafe" stroke="#2364aa" strokeWidth="3" />
        <rect x="180" y="245" width="100" height="84" rx="18" fill="#bfdbfe" stroke="#2364aa" strokeWidth="3" />
        <rect x="340" y="125" width="100" height="76" rx="18" fill="#fee2e2" stroke="#c23b3b" strokeWidth="3" />
        <rect x="340" y="245" width="100" height="84" rx="18" fill="#fecaca" stroke="#c23b3b" strokeWidth="3" />
        <text x="230" y="158" textAnchor="middle">עלייה</text>
        <text x="230" y="181" textAnchor="middle">ימנית</text>
        <text x="230" y="284" textAnchor="middle">חדר</text>
        <text x="230" y="307" textAnchor="middle">ימני</text>
        <text x="390" y="158" textAnchor="middle">עלייה</text>
        <text x="390" y="181" textAnchor="middle">שמאלית</text>
        <text x="390" y="284" textAnchor="middle">חדר</text>
        <text x="390" y="307" textAnchor="middle">שמאלי</text>
        <path d="M78 70 C112 80 145 120 180 150" fill="none" stroke="#2364aa" strokeWidth="8" markerEnd="url(#arrow-blue)" />
        <text x="80" y="55" textAnchor="middle">מהגוף</text>
        <path d="M228 330 C210 395 95 390 78 300" fill="none" stroke="#2364aa" strokeWidth="8" markerEnd="url(#arrow-blue)" />
        <text x="84" y="288" textAnchor="middle">לריאות</text>
        <path d="M540 80 C500 92 468 120 440 150" fill="none" stroke="#c23b3b" strokeWidth="8" markerEnd="url(#arrow-red)" />
        <text x="540" y="64" textAnchor="middle">מהריאות</text>
        <path d="M395 330 C420 395 530 390 552 285" fill="none" stroke="#c23b3b" strokeWidth="8" markerEnd="url(#arrow-red)" />
        <text x="548" y="272" textAnchor="middle">לגוף</text>
      </svg>
      <div className="legend">
        <span><i className="blue-dot" /> דם עני בחמצן</span>
        <span><i className="red-dot" /> דם עשיר בחמצן</span>
      </div>
    </div>
  );
}
