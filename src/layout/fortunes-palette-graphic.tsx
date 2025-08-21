const FortunesPaletteGraphic = () => {
  return (
    <svg
      viewBox="0 00 400 190"
      className="w-full h-full md:scale-100 transition-transform">
      <defs>
        <path
          id="curve"
          d="M 10,110 A 220, 80 0 0,1 390,110"
          fill="none"
        />
        <filter
          id="text-shadow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2"
            floodColor="#1f2937"
            floodOpacity="0.5"
          />
        </filter>
      </defs>

      <text
        filter="url(#text-shadow)"
        fill="currentColor"
        fontSize="58"
        fontWeight="bold"
        textAnchor="middle"
        className="uppercase tracking-widest">
        <textPath
          href="#curve"
          startOffset="50%">
          FORTUNE'S
        </textPath>
      </text>

      <text
        filter="url(#text-shadow)"
        x="200"
        y="130"
        fill="currentColor"
        fontSize="38"
        fontWeight="bold"
        textAnchor="middle"
        className="uppercase tracking-widest">
        ★ PALETTE ★
      </text>

      <text
        x="200"
        y="180"
        fill="currentColor"
        fontSize="20"
        fontWeight="bold"
        textAnchor="middle"
        className="uppercase tracking-widest">
        past ✸ present ✸ future
      </text>
      <text
        x="430"
        y="130"
        rotate={45}
        opacity="0.7"
        fill="currentColor"
        fontSize="40"
        fontWeight="bold"
        textAnchor="middle"
        className="uppercase tracking-widest">
        ★
      </text>
      <text
        x="410"
        y="20"
        rotate={90}
        opacity="0.7"
        fill="currentColor"
        fontSize="30"
        fontWeight="bold"
        textAnchor="middle"
        className="uppercase tracking-widest hidden md:flex">
        ★
      </text>
      <text
        x="-30"
        y="130"
        opacity="0.7"
        rotate={45}
        fill="currentColor"
        fontSize="40"
        fontWeight="bold"
        textAnchor="middle"
        className="uppercase tracking-widest">
        ★
      </text>
      <text
        x="20"
        y="50"
        rotate={-90}
        opacity="0.7"
        fill="currentColor"
        fontSize="30"
        fontWeight="bold"
        textAnchor="middle"
        className="uppercase tracking-widest hidden md:flex">
        ★
      </text>
    </svg>
  );
};

export default FortunesPaletteGraphic;
