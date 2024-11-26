"use client";

import { WaveBackground } from "@/components/WaveBackground";

export default function PasswordUpdatedFailed() {
  return (
    <div className="relative min-h-screen isolate">
      <WaveBackground />
      <div className="relative flex min-h-screen items-center justify-center p-4 -mt-[60px] lg:-mt-[50px]">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-xl font-medium">
              Demande de réinitialisation de mot de passe
            </h1>
          </div>
          <div>
            <div className="relative text-center">
              {" "}
              <span className=" text-red-800">
                La modification de votre mot de passe a échouée car le format
                n'est pas supporté ou le lien de réinitialisation a expiré.
              </span>
            </div>
          </div>

          <div className="text-center  mt-4">
            <a href="/home" className="text-sm text-purple-800 hover:underline">
              Retour à l&apos;accueil
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
