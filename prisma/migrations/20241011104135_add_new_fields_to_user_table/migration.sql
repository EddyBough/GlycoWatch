/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "lastname" TEXT,
ADD COLUMN     "phone" TEXT;
