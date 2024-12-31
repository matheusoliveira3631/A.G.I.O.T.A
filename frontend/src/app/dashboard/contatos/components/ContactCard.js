import { Card } from "flowbite-react"

export default function ContactCard({contacts})
{
    function currency(valor) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valor);
      }

    return (
        <>
        {contacts.map((contact) => (
        <Card href="#" key={contact.id} className="max-w-sm m-5">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {contact.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Telefone: <b>{contact.phone}</b>
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Dívida: {currency(contact.debt)}
            </p>
        </Card>
        ))}
    </>
    )
}