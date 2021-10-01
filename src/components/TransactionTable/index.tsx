import { useContext } from "react";
import { TransactionsContext } from "../../TransactionsContext";
import { Conteiner } from "./styles";


export function TransactionTable() {
    const transaction = useContext(TransactionsContext)


    return(
        <Conteiner>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.map(transaction => (
                    <tr key={transaction.id}>
                        <td>{transaction.title}</td>
                        <td className={transaction.type}>
                            {/* Formatação de moeda usando uma api nativa do javascript */}
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(transaction.amount)}
                        </td>
                        <td>{transaction.category}</td>
                        <td>
                            
                            {new Intl.DateTimeFormat('pt-BR').format(
                                new Date(transaction.createdAt)
                            )}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Conteiner>
    );
}
