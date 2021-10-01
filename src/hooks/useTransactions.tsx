// Modelo de cotext
// import { createContext } from 'react'

// export const TransactionContext = createContext([Valor inicial aqui]);

import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// interface TransactionInput {
//     title: string;
//     amount: number;
//     type: string;
//     category: string;
// }

//isso aqui equivale a criação de cima, porém aqui herdamos o tipo
// Transaction e omitimos os campos que não iremos trabalhar
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
    children: ReactNode;
}

//definindo esse tipo para passar os dois valores pelo atributo lá no retorno
interface TransactionsContextData {
    transactions: Transaction[];
    //a funcção recebe um "transaction" e não tem retorno, mas por ser Async, necessito informar que é uma promise
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}


const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactiosProvider({children}: TransactionsProviderProps){
    const[transactions, setTransactions] = useState<Transaction[]>([])


    useEffect(()=> {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);


    async function createTransaction(transactionInput: TransactionInput){
        const response = await api.post('/transactions', {
              ...transactionInput,
              createdAt: new Date()
            })
          const { transaction } = response.data;

          //copio tudo que já esta no vetor e adicion
          setTransactions([
              ...transactions,
              transaction
          ])
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)

    return context;
}
