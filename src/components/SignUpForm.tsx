"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackgroundDashboard } from "@/components/BackgroundDashboard";
import {
  signIn,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
          firstname,
          birthdate,
          address,
          phone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Inscription réussie ! Connexion en cours...");

        // Connect automatically the user
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.ok) {
          // Redirection to the dashboard after successful connection
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        } else {
          // If the connection fails, redirect to signin
          toast.error(
            "Compte créé mais connexion échouée. Veuillez vous connecter."
          );
          setTimeout(() => {
            router.push("/signin");
          }, 2000);
        }
      } else {
        // Display specific errors using toasts
        if (data.errors) {
          Object.keys(data.errors).forEach((key) => {
            toast.error(data.errors[key]);
          });
        } else {
          toast.error(data.message || "Échec de l'inscription");
        }
      }
    } catch (error) {
      toast.error("Erreur lors de la requête.");
    }
  };

  return (
    <div className="min-h-screen">
      <BackgroundDashboard />
      <ToastContainer />

      <div className="container relative mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Créer un compte
          </h1>
          <p className="text-white/70">
            Commencez votre suivi glycémique en quelques secondes
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Nom
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Prénom
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Votre prénom"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Votre numéro de téléphone"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white block">
                Adresse
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Votre adresse complète"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-emerald-500/50"
              >
                Créer mon compte
              </button>
            </div>
          </form>

          {/* Séparateur et options OAuth */}
          {providers &&
            Object.values(providers).some((p) => p.id !== "credentials") && (
              <>
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-white/70">OU</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.values(providers).map((provider) => {
                    if (provider.id === "credentials") return null;

                    const iconSrc =
                      provider.id === "google"
                        ? "/image/google-logo.png"
                        : provider.id === "github"
                        ? "/image/icon-github.png"
                        : null;

                    return (
                      <button
                        key={provider.name}
                        type="button"
                        onClick={() =>
                          signIn(provider.id, { callbackUrl: "/dashboard" })
                        }
                        className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium text-white"
                      >
                        {iconSrc && (
                          <Image
                            src={iconSrc}
                            alt={`${provider.name} Icon`}
                            width={20}
                            height={20}
                            className="mr-2 w-5 h-5"
                          />
                        )}
                        {provider.id === "google" ? "Google" : provider.name}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

          {/* Lien vers la page de connexion */}
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Déjà un compte ?{" "}
              <Link
                href="/signin"
                className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
