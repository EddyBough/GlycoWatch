import React from "react";

export function Terms() {
  return (
    <section className="mb-16 w-full">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8 text-center">
        Conditions d&apos;utilisation
      </h1>
      <div className="flex flex-col md:flex-row items-start justify-between gap-12">
        <div className="w-full flex flex-col bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Conditions d&apos;Utilisation de GlycoWatch®
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Ces conditions d&apos;utilisation régissent l&apos;accès et
            l&apos;utilisation de l&apos;application GlycoWatch. En utilisant
            cette application, vous acceptez pleinement ces conditions.
          </p>

          <h3 className="text-xl font-bold mb-2">
            1. Inscription et Compte Utilisateur
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Pour utiliser GlycoWatch®, vous devez créer un compte en fournissant
            des informations exactes et à jour. Vous êtes responsable de la
            confidentialité de votre compte et des informations que vous y
            partagez.
          </p>

          <h3 className="text-xl font-bold mb-2">
            2. Utilisation de l&apos;Application
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            L&apos;application est destinée à un usage personnel et vous aide à
            gérer votre suivi de santé. Vous vous engagez à ne pas utiliser
            l&apos;application de manière abusive, notamment en nuisant à la
            sécurité ou à l&apos;intégrité de ses services.
          </p>

          <h3 className="text-xl font-bold mb-2">
            3. Propriété Intellectuelle
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Tous les contenus, graphiques et éléments visuels de
            l&apos;application sont protégés par des droits d'auteur et ne
            peuvent être utilisés sans autorisation préalable.
          </p>

          <h3 className="text-xl font-bold mb-2">
            4. Limitation de Responsabilité
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            GlycoWatch ne fournit aucun diagnostic médical. Les informations et
            données recueillies sont uniquement des supports de suivi et ne
            remplacent pas un avis médical professionnel.
          </p>

          <h3 className="text-xl font-bold mb-2">
            5. Modifications des Conditions
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Nous nous réservons le droit de modifier les présentes conditions
            pour des raisons de conformité ou d'amélioration des services. Vous
            serez informé de toute modification significative.
          </p>

          <h3 className="text-xl font-bold mb-2">6. Contact</h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Si vous avez des questions concernant ces conditions, vous pouvez
            nous contacter via les informations de contact fournies dans
            l&apos;application.
          </p>
        </div>
      </div>
    </section>
  );
}
