-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "interest" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "interestPeriod" INTEGER NOT NULL DEFAULT 0;
