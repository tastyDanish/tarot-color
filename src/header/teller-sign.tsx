const TellerSign = () => {
  return (
    <div>
      <div className="relative w-[300px] h-[120px] md:w-[500px] md:h-[200px] bg-orange-100 text-amber-950 p-3 md:p-4 rounded-xl md:rounded-2xl overflow-hidden">
        <div className="relative h-full overflow-hidden">
          {[
            "-top-5 -left-5",
            "-top-5 -right-5",
            "-bottom-5 -left-5",
            "-bottom-5 -right-5",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full ${pos} border-amber-950 border-4`}
            />
          ))}

          <div className="h-full w-full border-amber-950 border-4 flex flex-col justify-center z-20">
            <svg
              viewBox="0 0 400 200"
              className="w-full h-full md:scale-100 transition-transform">
              <defs>
                <path
                  id="curve"
                  d="M 20,120 A 195,80 0 0,1 390,120"
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
                fontSize="64"
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
            </svg>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-80 pointer-events-none z-0 mix-blend-multiply"
          style={{
            backgroundImage: "url('/paper-texture.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "0% 0%",
          }}
        />
      </div>
    </div>
  );
};

export default TellerSign;
