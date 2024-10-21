// src/lib/measurements.ts
"use server"; // Cette directive garantit que Prisma s'exécute côté serveur

import prisma from "./prisma"; //  client Prisma

// Fonctions côté serveur (utilisant Prisma)
export async function getMeasurements(userId: number) {
  return await prisma.measurement.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
}

export async function addMeasurement(
  userId: number,
  insulinLevel: number,
  date: Date
) {
  return await prisma.measurement.create({
    data: {
      userId,
      insulinLevel,
      date: new Date(date),
    },
  });
}

export async function editMeasurement(id: number, insulinLevel: number) {
  return await prisma.measurement.update({
    where: { id },
    data: { insulinLevel },
  });
}

export async function deleteMeasurement(id: number) {
  return await prisma.measurement.delete({
    where: { id },
  });
}

// Fonctions fetch côté client (ancienne logique provenant de useMeasurements.ts)
export const useMeasurements = () => {
  const fetchMeasurements = async (userId: number) => {
    const response = await fetch(`/api/measurements?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des mesures");
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  };

  const addMeasurement = async (
    userId: number,
    insulinLevel: number,
    date: Date
  ) => {
    const response = await fetch("/api/measurements", {
      method: "POST",
      body: JSON.stringify({ userId, insulinLevel, date }),
      headers: { "Content-Type": "application/json" },
    });
    return response.ok ? await response.json() : null;
  };

  const editMeasurement = async (id: number, insulinLevel: number) => {
    const response = await fetch("/api/measurements", {
      method: "PUT",
      body: JSON.stringify({ id, insulinLevel }),
      headers: { "Content-Type": "application/json" },
    });
    return response.ok ? await response.json() : null;
  };

  const deleteMeasurement = async (
    id: number,
    onSuccess: (id: number) => void
  ) => {
    const response = await fetch(`/api/measurements?id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      onSuccess(id);
    }
    return response.ok;
  };

  return {
    fetchMeasurements,
    addMeasurement,
    editMeasurement,
    deleteMeasurement,
  };
};
