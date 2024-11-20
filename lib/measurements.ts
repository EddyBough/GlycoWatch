// src/lib/measurements.ts
"use server"; // Cette directive garantit que Prisma s'exécute côté serveur

import prisma from "./prisma"; //  client Prisma

// CRUD for dashboard (utilisant Prisma)
export async function getMeasurements(userId: number) {
  return await prisma.measurement.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
}

export async function addMeasurement(
  userId: number,
  glycemyLevel: number,
  date: Date
) {
  return await prisma.measurement.create({
    data: {
      userId,
      glycemyLevel,
      date: new Date(date),
    },
  });
}

export async function editMeasurement(id: number, glycemyLevel: number) {
  return await prisma.measurement.update({
    where: { id },
    data: { glycemyLevel },
  });
}

export async function deleteMeasurement(id: number) {
  return await prisma.measurement.delete({
    where: { id },
  });
}
