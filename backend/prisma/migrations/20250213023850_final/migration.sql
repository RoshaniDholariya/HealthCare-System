/*
  Warnings:

  - You are about to drop the column `latitude` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `certificate` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "certificate" TEXT NOT NULL;
