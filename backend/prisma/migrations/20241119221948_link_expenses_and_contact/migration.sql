-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_id_fkey" FOREIGN KEY ("id") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
