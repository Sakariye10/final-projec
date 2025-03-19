/*
  Warnings:

  - You are about to drop the column `H_Id` on the `Floor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Floor" DROP CONSTRAINT "Floor_H_Id_fkey";

-- AlterTable
ALTER TABLE "Floor" DROP COLUMN "H_Id";
