import React from "react";

export function PresentationPartTwo() {
  return (
    <section className="w-full mt-24 mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8">
        Connectez-vous et progressez
      </h2>
      <div className="flex flex-col md:flex-row-reverse items-start justify-between gap-12">
        <div className="w-full md:w-1/2">
          <p className="text-lg text-gray-700 mb-6">
            GlycoWatch analyse vos données facilement pour vous aider à mieux
            gérer votre diabète
          </p>
          <p className="text-lg text-gray-700 mb-6">
            GlycoWatch vous présente clairement vos données et journaux
            quotidiens, elle est idéale que vous soyez diabétique de Type 1,
            Type 2 ou que vous soyez enceinte avec un diabète gestationnel.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Identifiez vos meilleures journées, celles où vous avez le mieux
            géré vos glycémies.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Définissez vos objectifs et progressez.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1543333995-a78aea2eee50?auto=format&fit=crop&w=500"
            alt="Glucose Chart"
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}
