"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { updateProfile } from "../../../lib/profile";

interface UserProfile {
  id: number;
  userId: number;
  name: string;
  firstname: string;
  birthdate: Date | null; // Ajouter | null
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
    birthdate: profile?.birthdate ?? "", // Utiliser ?? au lieu de ||
    address: profile?.address ?? "",
    phone: profile?.phone ?? "",
    medications: profile?.medications ?? "",
    healthIssues: profile?.healthIssues ?? "",
  });
  console.log(session);

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
      alert(
        "Il manque un ou plusieurs champs à remplir pour valider le formulaire !"
      );
      return;
    }
    if (!session?.user?.id) {
      alert("Utilisateur non authentifié");
      return;
    }
    await updateProfile(session.user.id, formData);
    toast.success("Profil mis à jour avec succès");
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div>
      <ToastContainer />
      <h1>Mon Profil</h1>
      <h1>
        Profil de :{" "}
        {session?.user?.firstname
          ? `${session.user.firstname} ${session.user.name}`
          : session?.user?.name}{" "}
      </h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Firstname
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </label>
        <label>
          Date de naissance :
          <input
            type="date"
            name="birthdate"
            value={
              formData.birthdate
                ? new Date(formData.birthdate).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
          />
        </label>
        <label>
          Adresse :
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Téléphone :
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Médicaments :
          <input
            type="text"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
          />
        </label>
        <label>
          Problèmes de santé :
          <input
            type="text"
            name="healthIssues"
            value={formData.healthIssues}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default ProfilePage;
