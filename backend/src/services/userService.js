import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const SECRET_KEY = process.env.JWT_SECRET;

export const createUser = async ({ name, email, password }) => {
    console.log(password)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });
    return user;
};

export const listUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
};

export const loginUser = async ({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Credenciais inválidas');
    }
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    const userId = user.id;
    const name = user.name;
    return {token, userId, name};
  };

export const getExpenses = async (userId) => {
    const userExpenses = await prisma.expense.findMany({
      include: {
        contact: {
          select: {
            name: true, // Fetch only the contact name
          },
        },
      },
    });


    return userExpenses;
}

export const addContact = async ({ name, phone, userId }) => {
    const contact = await prisma.contact.create({
        data: { name, phone, userId },
    })
    return contact;
}

export const listContacts = async ({ userId }) => {
    const userContacts = await prisma.contact.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        user: {
          select: {
            expenses: true, // Fetch all expenses for the user
          },
        },
      },
    });
    
    console.dir(userContacts);

    // Map contacts to include their total expense balance
    return userContacts.map(contact => {
      const contactExpenses = contact.user.expenses.filter(expense => expense.contactId === contact.id);

      contactExpenses.map(expense => {
        //diff time in days
        const diffDays = getDaysDifference(new Date(expense.createdAt), new Date());
        const interest = expense.interest;
        const amount = expense.amount;
        const daysToCharge = Math.floor(diffDays/expense.interestPeriod);
        const totalInterest = (amount * interest/100) * daysToCharge;
        const totalAmount = amount + totalInterest;
        expense.amount = totalAmount;
      });

      const totalBalance = contactExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      
        delete contact.user;

        contact.debt = totalBalance;
        return {
          ...contact,
          expenses: contactExpenses,
        }
    });
  };


  export const dashBoardData = async ({ userId }) => {
    const totalUserContacts = await prisma.contact.count({
      where: {
        userId: parseInt(userId),
      },
    });

    const totalExpenseValue = await prisma.expense.aggregate({
      where: {
        userId: parseInt(userId),
        amount: {
          lt: 0,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalReturnedValue = await prisma.expense.aggregate({
      where: {
        userId: parseInt(userId),
        amount: {
          gt: 0,
        },
      },
      _sum: {
        amount: true,
      },
    });
 
    return {
      totalUserContacts,
      totalExpenseValue: Math.abs(totalExpenseValue._sum.amount) || 0,
      totalReturnedValue: totalReturnedValue._sum.amount || 0,
      totalBalance: (totalReturnedValue._sum.amount || 0) + (totalExpenseValue._sum.amount || 0),
      topExpenses: await top5Expenses({ userId }),
    };
  }


  const top5Expenses = async ({ userId }) => {
    // Fetch the top 5 users with the most debt
    const topContacts = await prisma.expense.groupBy({
      by: ['contactId'],
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc', // Order by total debt (highest first)
        },
      },
      take: 5, // Limit to the top 5 contacts
    });

    const topIds = topContacts.map(contact => contact.contactId);

    const topUsers = await prisma.contact.groupBy({
      by: ["name", "debt", "id"],
      where: {
        id: {
          in: topIds,
        },
      },
    }); 


    return topUsers.map(user => {
      user.debt = topContacts.find(contact => contact.contactId === user.id)._sum.amount;
      return user
    })
  }

  function getDaysDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
  
    // Calculate the absolute difference in milliseconds and convert to days
    const diffInDays = Math.abs((secondDate - firstDate) / oneDay);
  
    return Math.floor(diffInDays); // Return the difference as an integer
  }
  
  
  
