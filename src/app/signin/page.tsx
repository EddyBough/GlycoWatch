"use client";

import { useEffect, useState } from "react";
import {
  getProviders,
  signIn,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import ErrorModal from "@/components/errorModal";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { BackgroundDashboard } from "@/components/BackgroundDashboard";

export default function SignIn() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    fetchProviders();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      window.location.href = "/dashboard";
    } else {
      setShowErrorModal(true);
    }
  };

  if (!providers) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ClipLoader color="#00cba9" size={50} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen isolate">
      <BackgroundDashboard />
      <div className="relative flex min-h-screen items-center justify-center p-4 -mt-[60px] lg:-mt-[50px]">
        <ErrorModal
          isOpen={showErrorModal}
          title="Erreur de connexion"
          message="Les informations de connexion sont incorrectes. Réessayez avec vos identifiant et mot de passe"
          onConfirm={() => setShowErrorModal(false)}
        />
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-xl font-medium text-white">Bienvenue</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-emerald-500/50"
            >
              Se connecter
            </button>
            <span>
              <a
                href="/forgot-password"
                className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
              >
                Mot de passe oublié ?
              </a>
            </span>
          </form>

          {Object.values(providers).some((p) => p.id !== "credentials") && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-950 text-white/70">
                    Se connecter avec
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.values(providers).map((provider) => {
                  if (provider.id === "credentials") return null;

                  const iconSrc =
                    provider.id === "google"
                      ? "/image/icon-google.svg"
                      : provider.id === "github"
                      ? "/image/icon-github.svg"
                      : null;

                  return (
                    <button
                      key={provider.name}
                      onClick={() =>
                        signIn(provider.id, { callbackUrl: "/dashboard" })
                      }
                      className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium text-white"
                    >
                      {provider.name}
                      {iconSrc && (
                        <Image
                          src={iconSrc}
                          alt={`${provider.name} Icon`}
                          width={20}
                          height={20}
                          className="ml-2 w-5 h-5"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
