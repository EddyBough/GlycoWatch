// src/lib/measurements.ts
"use server"; // Cette directive garantit que Prisma s'exécute côté serveur

import prisma from "./prisma"; //  client Prisma

// CRUD for dashboard (utilisant Prisma)
export async function getMeasurements(userId: number) {
  return await prisma.measurement.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    select: {
      id: true,
      glycemyLevel: true,
      insulinDose: true,
      date: true,
    },
  });
}

export async function addMeasurement(
  userId: number,
  glycemyLevel: number,
  insulinDose: number | null,
  date: Date
) {
  return await prisma.measurement.create({
    data: {
      userId,
      glycemyLevel,
      insulinDose,
      date: new Date(date),
    },
  });
}

export async function editMeasurement(
  id: number,
  glycemyLevel: number,
  insulinDose: number | null
) {
  return await prisma.measurement.update({
    where: { id },
    data: {
      glycemyLevel,
      insulinDose,
    },
  });
}

export async function deleteMeasurement(id: number) {
  return await prisma.measurement.delete({
    where: { id },
  });
}
