/*
  Warnings:

  - You are about to drop the column `insulinLevel` on the `Measurement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Measurement" DROP COLUMN "insulinLevel",
ADD COLUMN     "glycemyLevel" DOUBLE PRECISION,
ADD COLUMN     "insulinDose" DOUBLE PRECISION;
