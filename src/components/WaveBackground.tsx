import React from "react";

export function WaveBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <div className="absolute inset-0 w-full h-full transform -skew-y-6 translate-y-1/4">
        <svg
          className="absolute w-[200%] h-full opacity-80"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2880 1600"
          preserveAspectRatio="none"
        >
          <path
            fill="#00cba9"
            fillOpacity="0.6"
            d="M0,256L48,261.3C96,267,192,277,288,245.3C384,213,480,139,576,122.7C672,107,768,149,864,181.3C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,1600L1392,1600C1344,1600,1248,1600,1152,1600C1056,1600,960,1600,864,1600C768,1600,672,1600,576,1600C480,1600,384,1600,288,1600C192,1600,96,1600,48,1600L0,1600Z"
          ></path>
          <path
            fill="#00cba9"
            fillOpacity="0.4"
            d="M0,384L48,378.7C96,373,192,363,288,349.3C384,336,480,320,576,277.3C672,235,768,165,864,154.7C960,144,1056,192,1152,213.3C1248,235,1344,229,1392,226.7L1440,224L1440,1600L1392,1600C1344,1600,1248,1600,1152,1600C1056,1600,960,1600,864,1600C768,1600,672,1600,576,1600C480,1600,384,1600,288,1600C192,1600,96,1600,48,1600L0,1600Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
