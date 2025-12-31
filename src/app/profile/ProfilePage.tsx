"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { updateProfile, deleteUser } from "../../../lib/profile";
import { BackgroundDashboard } from "@/components/BackgroundDashboard";
import ConfirmationModal from "@/components/confirmationModal";

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
  diabetesType: string | null;
}

const ProfilePage = ({ profile }: { profile: UserProfile }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    firstname: profile?.firstname || "",
    birthdate: profile?.birthdate ?? "",
    address: profile?.address ?? "",
    phone: profile?.phone ?? "",
    medications: profile?.medications ?? "",
    healthIssues: profile?.healthIssues ?? "",
    diabetesType: profile?.diabetesType ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(profile.userId); // Call the function directly on the server
      await signOut();
      toast.success("Compte supprimé avec succès");
      setTimeout(() => {
        router.push("/"); // Redirect after deletion
      }, 2000);
    } catch (error) {
      toast.error("Erreur lors de la suppression du compte");
    }
  };

  return (
    <div className="min-h-screen">
      <BackgroundDashboard />
      <ToastContainer />

      <div className="container relative mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mon Profil</h1>
          <p className="text-white/70">
            Profil de{" "}
            <span className="font-medium text-white">
              {session?.user?.firstname
                ? `${session.user.firstname} ${session.user.name}`
                : session?.user?.name}
            </span>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="Votre nom"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="Votre prénom"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
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
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="Votre numéro de téléphone"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white block">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="Votre adresse complète"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white block">
                Médicaments
              </label>
              <input
                type="text"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="Liste de vos médicaments"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white block">
                Type de diabète
              </label>
              <select
                name="diabetesType"
                value={formData.diabetesType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all [&>option]:bg-gray-800 [&>option]:text-white"
              >
                <option value="">Sélectionnez votre type de diabète</option>
                <option value="TYPE_1">Type 1 (insulinodépendant)</option>
                <option value="TYPE_2">Type 2</option>
                <option value="GESTATIONAL">Diabète gestationnel</option>
                <option value="LADA">
                  LADA (diabète auto-immun latent de l&apos;adulte)
                </option>
                <option value="OTHER">Autre type de diabète</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white block">
                Problèmes de santé
              </label>
              <input
                type="text"
                name="healthIssues"
                value={formData.healthIssues}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="Vos problèmes de santé"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full mb-16 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-emerald-500/50"
              >
                Mettre à jour le profil
              </button>
            </div>
          </form>

          {/* Modal de confirmation */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-red-500/90 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-red-500/50"
          >
            Supprimer votre compte
          </button>

          <ConfirmationModal
            isOpen={showModal}
            title="Confirmation"
            message="Êtes-vous sûr de vouloir supprimer votre compte ?"
            onConfirm={() => {
              setShowModal(false);
              handleDeleteAccount();
            }}
            onCancel={() => setShowModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
