import Image from "next/image";

export function PresentationPartTwo() {
  return (
    <section className="w-full mt-24 mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8 text-center lg:text-start">
        Connectez-vous et progressez
      </h2>
      <div className="flex flex-col md:flex-row-reverse items-start justify-between gap-12 ">
        <div className="w-full md:w-1/2 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <p className="text-lg text-gray-700 mb-6">
            GlycoWatch® analyse vos données facilement pour vous aider à mieux
            gérer votre diabète
          </p>
          <p className="text-lg text-gray-700 mb-6">
            GlycoWatch® vous présente clairement vos données et journaux
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
        <div className="w-full md:w-1/2 lg:mt-9">
          <Image
            src="/image/freedom-image.jpg"
            alt="Glucose Chart"
            width={400}
            height={400}
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300 lg:-mt-6"
          />
        </div>
      </div>
    </section>
  );
}
