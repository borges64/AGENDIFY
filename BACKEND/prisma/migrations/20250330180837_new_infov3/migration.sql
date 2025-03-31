/*
  Warnings:

  - You are about to drop the column `status` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cnpj` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AppointmentParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_userId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentParticipant" DROP CONSTRAINT "AppointmentParticipant_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentParticipant" DROP CONSTRAINT "AppointmentParticipant_userId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_appointmentId_fkey";

-- DropIndex
DROP INDEX "User_cnpj_key";

-- DropIndex
DROP INDEX "User_cpf_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "status",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "cnpj",
DROP COLUMN "cpf",
DROP COLUMN "isAdmin",
DROP COLUMN "phone",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "AppointmentParticipant";

-- DropTable
DROP TABLE "Log";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
