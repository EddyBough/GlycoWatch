"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackgroundDashboard } from "@/components/BackgroundDashboard";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Données envoyées : ", {
      email,
      password,
      name,
      firstname,
      birthdate,
      address,
      phone,
    });

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

      console.log("Réponse de l'API : ", res);

      if (res.ok) {
        toast.success("Inscription réussie ! Redirection...");
        setTimeout(() => router.push("/dashboard"), 3000);
      } else {
        const data = await res.json();
        toast.error(data.message || "Échec de l'inscription");
      }
    } catch (error) {
      console.error("Erreur lors de la requête : ", error);
      toast.error("Erreur lors de la requête.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00cba9]/10 to-white/50">
      <BackgroundDashboard />
      <ToastContainer />

      <div className="container relative mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-600">
            Remplissez le formulaire ci-dessous pour vous inscrire
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Nom
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Prénom
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Votre prénom"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Votre numéro de téléphone"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Adresse
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Votre adresse complète"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#00cba9] hover:bg-[#00b598] text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
              >
                Créer mon compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
