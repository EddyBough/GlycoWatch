"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ProfilePage from "./ProfilePage"; // Le composant qui affiche les données du profil
import { getProfile, updateProfile } from "../../../lib/profile"; // Assurez-vous que ces fonctions existent

export default function Profile() {
  const { data: session, status } = useSession(); // `session` et `status` sont extraits ici
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Interface pour typer le profil utilisateur
  interface UserProfile {
    id: number;
    userId: number;
    birthdate: Date | null;
    address: string | null;
    phone: string | null;
    medications: string | null;
    healthIssues: string | null;
    name: string; // Ajout de la propriété name
    firstname: string; // Ajout de la propriété firstname
  }

  // Redirection si non connecté
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Charger les données de profil si la session est authentifiée
  useEffect(() => {
    const loadProfile = async () => {
      if (session?.user?.id) {
        try {
          const data = await getProfile(session.user.id); // Récupérer les données du profil

          if (data) {
            // Mise à jour des données du profil si elles existent
            setProfile({
              id: data.id,
              userId: data.userId,
              birthdate: data.birthdate ?? null,
              address: data.address ?? null,
              phone: data.phone ?? null,
              medications: data.medications ?? null,
              healthIssues: data.healthIssues ?? null,
              name: data.user?.name ?? "", // Assure qu'on a une chaîne de caractères
              firstname: data.user?.firstname ?? "", // Assure qu'on a une chaîne de caractères
            });
          } else {
            console.error("Aucune donnée de profil trouvée.");
          }
        } catch (error) {
          console.error("Erreur lors du chargement du profil:", error);
        }
      }
    };

    console.log("Session: ", session);
    console.log("Status: ", status);

    if (status === "authenticated" && session?.user?.id) {
      loadProfile(); // Appelle la fonction pour charger le profil
    }
  }, [status, session]);

  // Si le profil n'est pas encore chargé
  if (!profile) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <ProfilePage profile={profile} />{" "}
      {/* Passe les données au composant ProfilePage */}
    </div>
  );
}
