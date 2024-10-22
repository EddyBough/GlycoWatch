// src/lib/profile.ts
"use server"; // Garantit que le code s'exécute côté serveur

import prisma from "./prisma"; // Ton client Prisma

// Récupérer le profil de l'utilisateur via son ID
export async function getProfile(userId: number) {
  return await prisma.profile.findUnique({
    where: { userId },
  });
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
