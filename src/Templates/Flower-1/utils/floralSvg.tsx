
interface FloralProps {
  color?: string;
  accent?: string;
  size?: number;
  opacity?: number;
  flip?: boolean;
}

/* =========================================================
   FLOWER
========================================================= */

export const FloralFlower = ({
  color = "currentColor",
  accent = color,
  size = 100,
  opacity = 1,
}: FloralProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <g stroke={color} strokeWidth="1.2">
        <ellipse cx="50" cy="25" rx="13" ry="23" />
        <ellipse
          cx="50"
          cy="25"
          rx="13"
          ry="23"
          transform="rotate(45 50 50)"
        />
        <ellipse
          cx="50"
          cy="25"
          rx="13"
          ry="23"
          transform="rotate(90 50 50)"
        />
        <ellipse
          cx="50"
          cy="25"
          rx="13"
          ry="23"
          transform="rotate(135 50 50)"
        />
      </g>

      <circle
        cx="50"
        cy="50"
        r="9"
        stroke={accent}
        strokeWidth="1.5"
      />

      <circle cx="50" cy="50" r="3" fill={accent} />

      <g fill={accent}>
        <circle cx="50" cy="42" r="1.5" />
        <circle cx="58" cy="50" r="1.5" />
        <circle cx="50" cy="58" r="1.5" />
        <circle cx="42" cy="50" r="1.5" />
      </g>
    </svg>
  );
};


/* =========================================================
   SMALL FLOWER
========================================================= */

export const FloralSmallFlower = ({
  color = "currentColor",
  size = 45,
  opacity = 1,
}: FloralProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <g stroke={color} strokeWidth="1">
        <ellipse cx="25" cy="12" rx="6" ry="11" />
        <ellipse
          cx="25"
          cy="12"
          rx="6"
          ry="11"
          transform="rotate(60 25 25)"
        />
        <ellipse
          cx="25"
          cy="12"
          rx="6"
          ry="11"
          transform="rotate(120 25 25)"
        />
      </g>

      <circle
        cx="25"
        cy="25"
        r="4"
        fill={color}
      />
    </svg>
  );
};


/* =========================================================
   LEAF
========================================================= */

export const FloralLeaf = ({
  color = "currentColor",
  size = 80,
  opacity = 1,
}: FloralProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <path
        d="M12 68C31 50 48 32 68 12"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M27 54C17 48 14 38 18 31C28 35 32 44 27 54Z"
        stroke={color}
        strokeWidth="1"
      />

      <path
        d="M39 42C29 36 27 26 32 20C42 24 45 33 39 42Z"
        stroke={color}
        strokeWidth="1"
      />

      <path
        d="M51 30C43 24 42 16 47 10C55 15 57 23 51 30Z"
        stroke={color}
        strokeWidth="1"
      />

      <path
        d="M25 55C35 53 42 57 44 65C35 65 28 61 25 55Z"
        stroke={color}
        strokeWidth="1"
      />

      <path
        d="M39 41C49 39 56 43 58 51C49 51 43 47 39 41Z"
        stroke={color}
        strokeWidth="1"
      />
    </svg>
  );
};


/* =========================================================
   BRANCH
========================================================= */

export const FloralBranch = ({
  color = "currentColor",
  accent = color,
  size = 280,
  opacity = 1,
  flip = false,
}: FloralProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        opacity,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      {/* batang utama */}
      <path
        d="M20 260C70 210 92 155 145 112C187 78 220 48 260 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* cabang */}
      <path
        d="M66 211C52 181 50 158 58 136"
        stroke={color}
        strokeWidth="1.3"
      />

      <path
        d="M96 168C124 159 140 141 146 119"
        stroke={color}
        strokeWidth="1.3"
      />

      <path
        d="M145 112C166 112 183 100 193 84"
        stroke={color}
        strokeWidth="1.3"
      />

      {/* daun */}
      <g stroke={color} strokeWidth="1.1">
        <path d="M58 137C43 126 41 112 48 103C61 111 65 123 58 137Z" />
        <path d="M61 137C75 127 82 116 79 105C67 110 61 122 61 137Z" />

        <path d="M96 168C82 157 80 145 87 136C100 143 103 154 96 168Z" />
        <path d="M99 167C114 161 123 151 121 140C109 143 101 153 99 167Z" />

        <path d="M145 112C134 101 135 89 143 82C153 90 154 101 145 112Z" />
        <path d="M148 111C162 107 170 98 170 88C158 89 150 98 148 111Z" />

        <path d="M193 84C184 74 186 63 194 57C202 66 201 76 193 84Z" />
        <path d="M196 83C208 80 216 72 216 63C205 65 198 73 196 83Z" />
      </g>

      {/* bunga */}
      <FloralSmallFlower
        color={color}
        size={48}
        opacity={0.9}
      />

      <g transform="translate(126 94)">
        <FloralSmallFlower
          color={accent}
          size={40}
        />
      </g>

      <g transform="translate(200 53)">
        <FloralSmallFlower
          color={color}
          size={34}
        />
      </g>
    </svg>
  );
};


/* =========================================================
   CORNER
========================================================= */

export const FloralCorner = ({
  color = "currentColor",
  accent = color,
  size = 230,
  opacity = 1,
  flip = false,
}: FloralProps) => {
  return (
    <div
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
        opacity,
      }}
    >
      <FloralBranch
        color={color}
        accent={accent}
        size={size}
      />

      <div
        style={{
          position: "absolute",
          top: size * 0.35,
          left: size * 0.35,
        }}
      >
        <FloralFlower
          color={accent}
          size={size * 0.35}
        />
      </div>
    </div>
  );
};


/* =========================================================
   BOTTOM BOUQUET
========================================================= */

export const FloralBouquet = ({
  color = "currentColor",
  accent = color,
  size = 300,
  opacity = 1,
}: FloralProps) => {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 300 165"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {/* batang */}
      <path
        d="M150 165C145 120 120 80 70 40"
        stroke={color}
        strokeWidth="1.5"
      />

      <path
        d="M150 165C155 120 180 80 230 40"
        stroke={color}
        strokeWidth="1.5"
      />

      <path
        d="M150 165C150 110 150 65 150 25"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* daun kiri */}
      <g stroke={color} strokeWidth="1">
        <path d="M110 125C91 115 84 101 90 89C107 96 114 109 110 125Z" />
        <path d="M88 99C70 88 65 73 72 63C87 70 94 84 88 99Z" />
        <path d="M65 72C50 63 46 50 52 41C66 48 71 60 65 72Z" />
      </g>

      {/* daun kanan */}
      <g stroke={color} strokeWidth="1">
        <path d="M190 125C209 115 216 101 210 89C193 96 186 109 190 125Z" />
        <path d="M212 99C230 88 235 73 228 63C213 70 206 84 212 99Z" />
        <path d="M235 72C250 63 254 50 248 41C234 48 229 60 235 72Z" />
      </g>

      {/* bunga utama */}
      <g transform="translate(105 0)">
        <FloralFlower
          color={accent}
          size={90}
        />
      </g>

      <g transform="translate(48 38)">
        <FloralSmallFlower
          color={color}
          size={55}
        />
      </g>

      <g transform="translate(198 38)">
        <FloralSmallFlower
          color={color}
          size={55}
        />
      </g>
    </svg>
  );
};


/* =========================================================
   DIVIDER
========================================================= */

export const FloralDivider = ({
  color = "currentColor",
  accent = color,
  width = 240,
}: {
  color?: string;
  accent?: string;
  width?: number;
}) => {
  return (
    <svg
  width={width}
  height="45"
  viewBox="0 0 240 45"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M5 22.5H82" stroke={color} strokeWidth="1" />
  <path d="M158 22.5H235" stroke={color} strokeWidth="1" />

  {/* BUNGA MATAHARI */}
  <g transform="translate(120 22.5)">
    {Array.from({ length: 8 }).map((_, i) => (
      <path
        key={i}
        d="M0 -4 C-5 -10 -6 -17 0 -22 C6 -17 5 -10 0 -4Z"
        transform={`rotate(${i * 45})`}
        stroke={accent}
        strokeWidth="1.2"
        fill="none"
      />
    ))}

    <circle
      cx="0"
      cy="0"
      r="4"
      fill={accent}
    />
  </g>

  <circle cx="94" cy="22.5" r="2" fill={color} />
  <circle cx="146" cy="22.5" r="2" fill={color} />
</svg>
  );
};


/* =========================================================
   SPARKLES
========================================================= */

export const FloralSparkles = ({
  color = "currentColor",
  size = 120,
  opacity = 0.6,
}: FloralProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <g stroke={color} strokeWidth="1">
        <path d="M60 5V35" />
        <path d="M60 85V115" />
        <path d="M5 60H35" />
        <path d="M85 60H115" />

        <path d="M20 20L41 41" />
        <path d="M79 79L100 100" />
        <path d="M100 20L79 41" />
        <path d="M41 79L20 100" />
      </g>

      <circle
        cx="60"
        cy="60"
        r="4"
        fill={color}
      />
    </svg>
  );
};


/* =========================================================
   FRAME
========================================================= */

export const FloralFrame = ({
  color = "currentColor",
  accent = color,
  opacity = 0.7,
}: FloralProps) => {
  return (
    <div
      className="pointer-events-none absolute inset-3"
      style={{ opacity }}
    >
      <div
        className="absolute inset-0 border"
        style={{
          borderColor: color,
        }}
      />

      <div className="absolute left-0 top-0">
        <FloralCorner
          color={color}
          accent={accent}
          size={130}
        />
      </div>

      <div className="absolute right-0 top-0">
        <FloralCorner
          color={color}
          accent={accent}
          size={130}
          flip
        />
      </div>

      <div className="absolute bottom-0 left-0 rotate-180">
        <FloralCorner
          color={color}
          accent={accent}
          size={130}
        />
      </div>

      <div className="absolute bottom-0 right-0 rotate-180">
        <FloralCorner
          color={color}
          accent={accent}
          size={130}
          flip
        />
      </div>
    </div>
  );
};
