import React from "react";

export function Privacy() {
  return (
    <section className="mb-16 w-full">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
        Confidentialité
      </h1>
      <div className="flex flex-col md:flex-row items-start justify-between gap-12">
        <div className="w-full flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Politique de Confidentialité de GlycoWatch®
          </h2>
          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            Nous prenons très au sérieux la confidentialité et la sécurité de
            vos données personnelles. Cette politique de confidentialité a pour
            but de vous informer des types de données que nous collectons, de la
            manière dont elles sont utilisées, et des engagements que nous
            prenons pour protéger votre vie privée.
          </p>

          <h3 className="text-xl font-bold text-white mb-2">
            1. Collecte des Données
          </h3>
          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            Dans le cadre de l&apos;utilisation de l&apos;application
            GlycoWatch, nous collectons uniquement les informations nécessaires
            pour vous fournir un service optimal. Cela inclut notamment vos
            informations de connexion (nom, prénom, adresse e-mail) et, le cas
            échéant, des données de santé telles que vos niveaux d’insuline et
            votre historique de mesures.
          </p>

          <h3 className="text-xl font-bold text-white mb-2">
            2. Utilisation des Données
          </h3>
          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            Les informations que vous partagez sont exclusivement utilisées
            pour:
          </p>
          <ul className="list-disc list-inside text-lg text-white/80 mb-6 leading-relaxed">
            <li>
              Vous fournir des fonctionnalités et des services adaptés à votre
              suivi de santé
            </li>
            <li>
              Vous offrir une expérience personnalisée au sein de l’application
            </li>
            <li>Vous aider à mieux gérer votre état de santé</li>
          </ul>
          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            Ces données ne sont en aucun cas partagées avec des tiers, sauf si
            cela est nécessaire pour fournir le service et avec votre
            consentement explicite. En aucun cas, vos données ne sont vendues,
            louées ou échangées avec d&apos;autres parties.
          </p>

          <h3 className="text-xl font-bold text-white mb-2">
            3. Accès aux Données
          </h3>
          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            Seul vous, en tant qu&apos;utilisateur de l&apos;application, avez
            un accès complet à vos données de santé. Nos équipes techniques
            peuvent exceptionnellement accéder aux données, mais seulement à des
            fins de support technique et de maintenance, et toujours en
            respectant les normes strictes de confidentialité.
          </p>

          <h3 className="text-xl font-bold text-white mb-2">
            4. Sécurité des Données
          </h3>
          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            Nous utilisons des protocoles de sécurité de pointe pour protéger
            vos informations. Les données personnelles sont cryptées et stockées
            de manière sécurisée, de sorte que toute tentative d’accès non
            autorisé soit prévenue.
          </p>

          <h3 className="text-xl font-bold text-white mb-2">5. Vos Droits</h3>
          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            En utilisant GlycoWatch, vous conservez tous vos droits relatifs à
            vos informations personnelles. Vous avez le droit de consulter, de
            modifier ou de supprimer vos données à tout moment via les
            paramètres de votre compte.
          </p>

          <h3 className="text-xl font-bold text-white mb-2">
            6. Mise à Jour de la Politique de Confidentialité
          </h3>
          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            Cette politique de confidentialité pourra être mise à jour pour
            suivre l&apos;évolution des réglementations ou pour toute
            amélioration du service. Nous vous informerons en cas de changements
            importants.
          </p>
        </div>
      </div>
    </section>
  );
}
