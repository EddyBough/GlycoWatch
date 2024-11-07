"use client";

import { useEffect, useState } from "react";
import {
  getProviders,
  signIn,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { WaveBackground } from "@/components/WaveBackground";
import ErrorModal from "@/components/errorModal";
import { ClipLoader } from "react-spinners";

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
      console.log("Fetched providers:", providers);
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
    <div className="relative min-h-screen flex items-center justify-center p-4 mt-[-60px] lg:mt-[-50px]">
      <WaveBackground />
      <ErrorModal
        isOpen={showErrorModal}
        title="Erreur de connexion"
        message="Les informations de connexion sont incorrectes. Réessayez avec vos identifiant et mot de passe"
        onConfirm={() => setShowErrorModal(false)}
      />
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="lg:text-xl md:text-xl text-s font-medium">
            Bienvenue
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00cba9] text-white py-3 px-4 rounded-lg hover:bg-[#9333EA] transition-colors duration-200 font-medium"
          >
            Se connecter
          </button>
        </form>

        {Object.values(providers).some((p) => p.id !== "credentials") && (
          <>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Se connecter avec
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.values(providers).map((provider) => {
                if (provider.id === "credentials") return null;

                return (
                  <button
                    key={provider.name}
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: "/dashboard" })
                    }
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    {provider.name}
                    <img
                      src="/image/icon-google.svg"
                      alt="Google Icon"
                      className=" ml-2 w-5 h-5"
                    />
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
