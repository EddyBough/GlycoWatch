"use server"; // Garantit que le code s'exécute côté serveur

import Profile from "@/app/profile/page";
import prisma from "./prisma"; // Ton client Prisma

// Récupérer le profil de l'utilisateur via son ID
export async function getProfile(userId: number) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          firstname: true,
        },
      },
    },
  });

  // Si aucun profil n'existe, on crée un profil par défaut
  if (!profile) {
    const newProfile = await prisma.profile.create({
      data: {
        userId: userId,
        birthdate: null,
        address: null,
        phone: null,
        medications: null,
        healthIssues: null,
      },
      include: {
        user: {
          select: {
            name: true,
            firstname: true,
          },
        },
      },
    });
    return newProfile;
  }

  return profile; // Assure que la fonction retourne toujours un profil
}

// Modifier les informations du profil
export async function updateProfile(userId: number, data: any) {
  const { name, firstname, birthdate, ...profileData } = data;

  // Convertir la date de naissance en un objet Date
  const birthdateAsDate = birthdate ? new Date(birthdate) : null;

  // Mise à jour du modèle `User`
  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      firstname,
    },
  });

  // Mise à jour du modèle `Profile`
  return await prisma.profile.update({
    where: { userId },
    data: {
      ...profileData,
      birthdate: birthdateAsDate, // On s'assure que la date est dans un format valide
    },
  });
}

// Fonction pour supprimer le profil de l'utilisateur
export async function deleteUser(userId: number) {
  // Suppression de l'utilisateur
  await prisma.user.delete({
    where: { id: userId },
  });

  // Vérification si l'utilisateur existe encore
  const userCheck = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (userCheck) {
    throw new Error("La suppression de l'utilisateur a échoué.");
  }

  return { message: "Compte supprimé avec succès" };
}
