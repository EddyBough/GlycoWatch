"use client";

export function BackgroundDashboard() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Fond sombre avec gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-950" />

      {/* Grille principale */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:55px_55px]" />

      {/* Carreaux dispersés - version simplifiée */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
            linear-gradient(rgba(16, 185, 129, 0.10), rgba(16, 185, 129, 0.10)),
            linear-gradient(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.22)),
            linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28)),
            linear-gradient(rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.12)),
            linear-gradient(rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.26)),
            linear-gradient(rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)),
            linear-gradient(rgba(16, 185, 129, 0.09), rgba(16, 185, 129, 0.09))
          `,
          backgroundSize:
            "55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px",
          backgroundPosition:
            "110px 55px, 275px 165px, 385px 275px, 55px 385px, 495px 110px, 165px 220px, 330px 440px, 220px 0px",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Effet de lumière diffuse */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/15 rounded-full blur-[120px]" />
    </div>
  );
}
