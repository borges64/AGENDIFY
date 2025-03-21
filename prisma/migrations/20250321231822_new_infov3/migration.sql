/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_cpf_key" ON "Admin"("cpf");
