-- CreateEnum
CREATE TYPE "DiabetesType" AS ENUM ('TYPE_1', 'TYPE_2', 'GESTATIONAL', 'LADA', 'OTHER');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "diabetesType" "DiabetesType";
