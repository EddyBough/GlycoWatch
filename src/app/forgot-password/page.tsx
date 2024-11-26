"use client";

import { WaveBackground } from "@/components/WaveBackground";

export default function ForgotPassword() {
  return (
    <div className="relative min-h-screen isolate">
      <WaveBackground />
      <div className="relative flex min-h-screen items-center justify-center p-4 -mt-[60px] lg:-mt-[50px]">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-xl font-medium">
              Réinitialiser votre mot de passe
            </h1>
          </div>

          <form
            action="/api/forgot-password"
            method="POST"
            className="space-y-6"
          >
            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Adresse email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00cba9] text-white py-3 px-4 rounded-lg hover:bg-[#9333EA] transition-colors duration-200 font-medium"
            >
              Envoyer un lien de réinitialisation
            </button>

            <div className="text-center mt-4">
              <a
                href="/home"
                className="text-sm text-[#00cba9] hover:underline"
              >
                Retour à la connexion
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
