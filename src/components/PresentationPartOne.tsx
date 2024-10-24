import React from "react";

export function PresentationPartOne() {
  return (
    <section className="mb-16 w-full">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">
        GlycoWatch
      </h1>
      <div className="flex flex-col md:flex-row items-start justify-between gap-12">
        <div className="w-full md:w-1/2 flex flex-col">
          <p className="text-lg text-gray-700 mb-6">
            Bienvenue sur notre toute nouvelle application, celle ci évoluera au
            fil du temps pour proposer toujours plus de fonctionnalités
            intéressante afin de devenir votre allié au quotidien !
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Inscrivez vous afin de pouvoir utiliser toute nos fonctionnalités.
            Plus besoin de tout écrire sur papier, GlycoWatch est là pour vous !
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Vous pouvez également partager en toute discrétion vos données avec
            vos proches ou votre médecin.
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
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500"
            alt="Medical App Interface"
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}
