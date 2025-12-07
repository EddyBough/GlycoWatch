"use client";

import Link from "next/link";
import { WaveBackground } from "@/components/WaveBackground";

export default function PasswordUpdatedSuccess() {
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
              <span className="text-green-500">
                Votre mot de passe est modifié avec succès
              </span>
            </div>
          </div>

          <div className="text-center  mt-4">
            <Link href="/" className="text-sm text-purple-800 hover:underline">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
