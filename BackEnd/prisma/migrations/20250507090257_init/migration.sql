/*
  Warnings:

  - Changed the type of `Balance` on the `Debts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Debts" DROP COLUMN "Balance",
ADD COLUMN     "Balance" INTEGER NOT NULL;
