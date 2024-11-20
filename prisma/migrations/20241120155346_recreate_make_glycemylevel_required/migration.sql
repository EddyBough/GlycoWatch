/*
  Warnings:

  - Made the column `glycemyLevel` on table `Measurement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Measurement" ALTER COLUMN "glycemyLevel" SET NOT NULL;
