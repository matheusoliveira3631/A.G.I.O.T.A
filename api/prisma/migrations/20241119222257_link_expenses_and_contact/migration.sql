/*
  Warnings:

  - Added the required column `contactId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_id_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "contactId" INTEGER NOT NULL;
