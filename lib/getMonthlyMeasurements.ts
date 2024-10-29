// lib/getMonthlyMeasurements.ts

"use server";

import prisma from "./prisma";

export async function getMonthlyMeasurements(
  userId: number,
  month: number,
  year: number
) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  return await prisma.measurement.findMany({
    where: {
      userId,
      date: {
        gte: firstDayOfMonth,
        lte: lastDayOfMonth,
      },
    },
    orderBy: {
      date: "asc",
    },
  });
}
