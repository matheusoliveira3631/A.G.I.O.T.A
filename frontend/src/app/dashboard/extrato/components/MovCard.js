import { Card } from "flowbite-react"

export default function MovCard({expenses})
{
    function currency(valor) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valor);
      }

      const modality = {
        1: "dia",
        30: "mês",
        365: "ano"
      }

      const formatarData = (data) => {
        const dateString = "2024-12-16T23:08:46.187Z";
        const date = new Date(dateString);

        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      }

    return (
        <>
        {expenses.map((expense) => (
        <Card href="#" key={expense.id} className="max-w-sm m-5">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {expense.contact.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Tipo de transação: <b>{parseInt(expense.amount) > 0 ? "Recebimento" : "Empréstimo"}</b>
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Valor: <b>{currency(Math.abs(expense.amount))}</b>
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Data: <b>{formatarData(expense.createdAt)}</b>
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Juros: <b>{`${expense.interest}% ao ${modality[expense.interestPeriod]}`}</b>
            </p>
        </Card>
        ))}
    </>
    )
}