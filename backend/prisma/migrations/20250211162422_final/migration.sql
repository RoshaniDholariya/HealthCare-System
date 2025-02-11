/*
  Warnings:

  - Added the required column `patientPhone` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "patientPhone" TEXT NOT NULL,
ALTER COLUMN "patientEmail" DROP NOT NULL,
ALTER COLUMN "patientName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "experience" INTEGER NOT NULL;
