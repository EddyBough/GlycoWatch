export function HeroBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-950" />

      {/* Grille principale - traits subtils */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:55px_55px]" />

      {/* Carreaux individuels dispersés - série 1 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)),
            linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
            linear-gradient(rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.12)),
            linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28)),
            linear-gradient(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.22)),
            linear-gradient(rgba(16, 185, 129, 0.10), rgba(16, 185, 129, 0.10)),
            linear-gradient(rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.26)),
            linear-gradient(rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32)),
            linear-gradient(rgba(16, 185, 129, 0.09), rgba(16, 185, 129, 0.09)),
            linear-gradient(rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)),
            linear-gradient(rgba(0, 0, 0, 0.29), rgba(0, 0, 0, 0.29)),
            linear-gradient(rgba(16, 185, 129, 0.13), rgba(16, 185, 129, 0.13)),
            linear-gradient(rgba(0, 0, 0, 0.23), rgba(0, 0, 0, 0.23)),
            linear-gradient(rgba(0, 0, 0, 0.27), rgba(0, 0, 0, 0.27)),
            linear-gradient(rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.33))
          `,
          backgroundSize:
            "55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px",
          backgroundPosition:
            "110px 55px, 275px 165px, 385px 275px, 55px 385px, 495px 110px, 165px 220px, 330px 440px, 220px 0px, 440px 330px, 0px 495px, 550px 165px, 715px 275px, 825px 55px, 660px 385px, 935px 220px",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Carreaux individuels dispersés - série 2 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.26)),
            linear-gradient(rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.12)),
            linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28)),
            linear-gradient(rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)),
            linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)),
            linear-gradient(rgba(16, 185, 129, 0.10), rgba(16, 185, 129, 0.10)),
            linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
            linear-gradient(rgba(0, 0, 0, 0.31), rgba(0, 0, 0, 0.31)),
            linear-gradient(rgba(16, 185, 129, 0.09), rgba(16, 185, 129, 0.09)),
            linear-gradient(rgba(0, 0, 0, 0.27), rgba(0, 0, 0, 0.27)),
            linear-gradient(rgba(0, 0, 0, 0.23), rgba(0, 0, 0, 0.23)),
            linear-gradient(rgba(0, 0, 0, 0.29), rgba(0, 0, 0, 0.29)),
            linear-gradient(rgba(16, 185, 129, 0.13), rgba(16, 185, 129, 0.13))
          `,
          backgroundSize:
            "55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px",
          backgroundPosition:
            "605px 110px, 770px 330px, 880px 440px, 990px 165px, 715px 0px, 825px 495px, 550px 275px, 1045px 385px, 660px 220px, 935px 55px, 1100px 275px, 770px 495px, 880px 165px",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Carreaux individuels dispersés - série 3 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28)),
            linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
            linear-gradient(rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.12)),
            linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)),
            linear-gradient(rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.26)),
            linear-gradient(rgba(16, 185, 129, 0.10), rgba(16, 185, 129, 0.10)),
            linear-gradient(rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)),
            linear-gradient(rgba(0, 0, 0, 0.31), rgba(0, 0, 0, 0.31)),
            linear-gradient(rgba(0, 0, 0, 0.27), rgba(0, 0, 0, 0.27)),
            linear-gradient(rgba(16, 185, 129, 0.09), rgba(16, 185, 129, 0.09))
          `,
          backgroundSize:
            "55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px",
          backgroundPosition:
            "1155px 110px, 1265px 330px, 1375px 220px, 1210px 440px, 1320px 55px, 1430px 385px, 1100px 495px, 1485px 165px, 1540px 275px, 1265px 0px",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Carreaux concentrés sur le bas - série 4 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.29), rgba(0, 0, 0, 0.29)),
            linear-gradient(rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.12)),
            linear-gradient(rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.26)),
            linear-gradient(rgba(0, 0, 0, 0.31), rgba(0, 0, 0, 0.31)),
            linear-gradient(rgba(16, 185, 129, 0.10), rgba(16, 185, 129, 0.10)),
            linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28)),
            linear-gradient(rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)),
            linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)),
            linear-gradient(rgba(16, 185, 129, 0.13), rgba(16, 185, 129, 0.13)),
            linear-gradient(rgba(0, 0, 0, 0.27), rgba(0, 0, 0, 0.27)),
            linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
            linear-gradient(rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32)),
            linear-gradient(rgba(16, 185, 129, 0.09), rgba(16, 185, 129, 0.09)),
            linear-gradient(rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.26)),
            linear-gradient(rgba(0, 0, 0, 0.29), rgba(0, 0, 0, 0.29)),
            linear-gradient(rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.12)),
            linear-gradient(rgba(0, 0, 0, 0.23), rgba(0, 0, 0, 0.23)),
            linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28)),
            linear-gradient(rgba(0, 0, 0, 0.31), rgba(0, 0, 0, 0.31)),
            linear-gradient(rgba(16, 185, 129, 0.10), rgba(16, 185, 129, 0.10))
          `,
          backgroundSize:
            "55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px, 55px 55px",
          backgroundPosition:
            "55px 550px, 165px 660px, 275px 770px, 385px 605px, 110px 715px, 220px 825px, 330px 880px, 440px 715px, 495px 605px, 550px 770px, 660px 550px, 770px 880px, 825px 660px, 935px 770px, 1045px 605px, 1100px 715px, 1210px 825px, 1320px 550px, 1430px 880px, 1540px 660px",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Effet de lumière diffuse */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px]" />
    </div>
  );
}
