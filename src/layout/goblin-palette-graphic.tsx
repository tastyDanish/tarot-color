const GoblinPaletteGraphic = () => {
  return (
    <svg
      viewBox="0 0 400 190"
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

      {/* Original crossed-out text */}
      {/* <text
        filter="url(#text-shadow)"
        fill="currentColor"
        fontSize="58"
        fontWeight="bold"
        textAnchor="middle"
        opacity="0.25"
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
        opacity="0.25"
        className="uppercase tracking-widest">
        ★ PALETTE ★
      </text> */}

      {/* Goblin takeover — outline layer */}
      <text
        fill="#D9D1B0"
        stroke="#D9D1B0"
        strokeWidth="10"
        strokeOpacity="0.35"
        fontSize="64"
        fontWeight="bold"
        textAnchor="middle"
        transform="rotate(-5, 200, 70)"
        style={{ fontFamily: "serif" }}
        className="uppercase tracking-widest">
        <textPath
          href="#curve"
          startOffset="50%">
          GOBLIN'S
        </textPath>
      </text>
      <text
        fill="#D9D1B0"
        stroke="#D9D1B0"
        strokeWidth="10"
        strokeOpacity="0.35"
        x="200"
        y="152"
        fontSize="42"
        fontWeight="bold"
        textAnchor="middle"
        transform="rotate(3, 200, 142)"
        style={{ fontFamily: "serif" }}
        className="uppercase tracking-widest">
        ☆ GORTUNE ☆
      </text>

      {/* Goblin takeover — fill layer */}
      <text
        filter="url(#text-shadow)"
        fill="#357844"
        fontSize="64"
        fontWeight="bold"
        textAnchor="middle"
        transform="rotate(-5, 200, 70)"
        style={{ fontFamily: "serif" }}
        className="uppercase tracking-widest">
        <textPath
          href="#curve"
          startOffset="50%">
          GOBLIN'S
        </textPath>
      </text>
      <text
        filter="url(#text-shadow)"
        x="200"
        y="152"
        fill="#357844"
        fontSize="42"
        fontWeight="bold"
        textAnchor="middle"
        transform="rotate(3, 200, 142)"
        style={{ fontFamily: "serif" }}
        className="uppercase tracking-widest">
        ☆ GORTUNE ☆
      </text>

      <text
        x="200"
        y="190"
        fill="#357844"
        fontSize="20"
        fontWeight="bold"
        textAnchor="middle"
        className="uppercase tracking-widest">
        gast ✸ gresent ✸ guture
      </text>

      <text
        x="430"
        y="130"
        rotate={45}
        opacity="0.7"
        fill="#357844"
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
        fill="#357844"
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
        fill="#357844"
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
        fill="#357844"
        fontSize="30"
        fontWeight="bold"
        textAnchor="middle"
        className="uppercase tracking-widest hidden md:flex">
        ★
      </text>
    </svg>
  );
};

export default GoblinPaletteGraphic;
