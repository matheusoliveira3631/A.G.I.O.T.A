import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createExpense = async (data) => {
    console.log("Data: ", data);
    const expense = await prisma.expense.create({
        data,
        include: {
          contact: true, // Include the contact information in the response
        },
      });
    return expense;
};

export const deleteExpense = async (id) => {
    const expense = await prisma.expense.delete({
        where: { id },
    });
    return expense;
};

export const totalExpenseBalance = async (userId) => {
  const expenses = await prisma.expense.groupBy({
    by: ["amount", "createdAt"],
    where: {
      userId,
    },
  });

  let posExpenses = expenses.filter((expense)=> expense.amount > 0);
  let negExpenses = expenses.filter((expense)=> expense.amount < 0);

  let posExpensesByMonth = {};
  let negExpensesByMonth = {};

  posExpenses.map(e=>{
    const month = new Date(e.createdAt).getMonth()+1;
    posExpensesByMonth[month] = posExpensesByMonth[month] + e.amount || e.amount;
  })

  negExpenses.map(e=>{
    const month = new Date(e.createdAt).getMonth()+1;
    negExpensesByMonth[month] = negExpensesByMonth[month] + e.amount || e.amount;
  })
  
  return {
    posExpensesByMonth,
    negExpensesByMonth,
  }
}