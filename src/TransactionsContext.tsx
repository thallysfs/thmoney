// Modelo de cotext
// import { createContext } from 'react'

// export const TransactionContext = createContext([Valor inicial aqui]);

import { createContext, useEffect, useState, ReactNode } from 'react'
import { api } from './services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;

}

interface TransactionProviderProps {
    children: ReactNode;
}


export const TransactionsContext = createContext<Transaction[]>([]);

export function TransactiosProvider({children}: TransactionProviderProps){
    const[transaction, setTransaction] = useState<Transaction[]>([])


    useEffect(()=> {
        api.get('transactions')
        .then(response => setTransaction(response.data.transactions))
    }, []);

    return (
        <TransactionsContext.Provider value={transaction}>
            {children}
        </TransactionsContext.Provider>
    )
}
