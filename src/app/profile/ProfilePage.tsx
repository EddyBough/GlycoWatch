"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { updateProfile } from "../../../lib/profile";
import { BackgroundDashboard } from "@/components/BackgroundDashboard";

interface UserProfile {
  id: number;
  userId: number;
  name: string;
  firstname: string;
  birthdate: Date | null;
  address: string | null;
  phone: string | null;
  medications: string | null;
  healthIssues: string | null;
}

const ProfilePage = ({ profile }: { profile: UserProfile }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    firstname: profile?.firstname || "",
    birthdate: profile?.birthdate ?? "",
    address: profile?.address ?? "",
    phone: profile?.phone ?? "",
    medications: profile?.medications ?? "",
    healthIssues: profile?.healthIssues ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.firstname ||
      !formData.birthdate ||
      !formData.address ||
      !formData.phone ||
      !formData.medications ||
      !formData.healthIssues
    ) {
      toast.error("Veuillez remplir tous les champs du formulaire");
      return;
    }
    if (!session?.user?.id) {
      toast.error("Utilisateur non authentifié");
      return;
    }
    await updateProfile(session.user.id, formData);
    toast.success("Profil mis à jour avec succès");
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00cba9]/10 to-white/50">
      <BackgroundDashboard />
      <ToastContainer />

      <div className="container relative mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600">
            Profil de{" "}
            <span className="font-medium">
              {session?.user?.firstname
                ? `${session.user.firstname} ${session.user.name}`
                : session?.user?.name}
            </span>
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                  placeholder="Votre nom"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                  placeholder="Votre prénom"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="birthdate"
                  value={
                    formData.birthdate
                      ? new Date(formData.birthdate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                  placeholder="Votre numéro de téléphone"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                placeholder="Votre adresse complète"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Médicaments
              </label>
              <input
                type="text"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                placeholder="Liste de vos médicaments"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Problèmes de santé
              </label>
              <input
                type="text"
                name="healthIssues"
                value={formData.healthIssues}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                placeholder="Vos problèmes de santé"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#00cba9] hover:bg-[#00b598] text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
              >
                Mettre à jour le profil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
