-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
