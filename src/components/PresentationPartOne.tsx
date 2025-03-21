import Image from "next/image";

export function PresentationPartOne() {
  return (
    <section className="mb-16 w-full">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8 text-center lg:text-start">
        GlycoWatch®
      </h1>
      <div className="flex flex-col md:flex-row items-start justify-between gap-12">
        <div className="w-full md:w-1/2 flex flex-col bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <p className="text-lg text-gray-700 mb-6">
            Bienvenue sur notre toute nouvelle application GlycoWatch®, elle est
            entièrement gratuite. Cette application vous permettra de suivre
            votre glycémie au quotidien en toute sécurité.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Vous pouvez ajouter vos mesures de glycémie, suivre votre
            progression quotidiennement grâce à un graphique et dans un
            calendrier pensé pour avoir la meilleure ergonomie. Vous pourrez
            éditer vos données en un fichier PDF. D&apos;autres fonctionnalités
            sont à venir.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Vous pouvez également partager en toute discrétion vos données avec
            vos proches ou votre médecin. Nous ne partageons aucune donnée avec
            personne.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/signin"
              className="group inline-flex items-center bg-customCyan text-white px-6 md:px-8 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Se connecter
            </a>
            <a
              href="/signup"
              className="group inline-flex items-center bg-white text-purple-600 px-6 md:px-8 py-3 rounded-full border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300"
            >
              S&rsquo;inscrire
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:mt-9">
          <Image
            src="/image/newcapturedashboard.png"
            alt="Medical App Interface"
            width={400}
            height={400}
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}
