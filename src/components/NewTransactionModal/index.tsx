import { FormEvent, useState, useContext } from 'react'
import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions'

import closeImg from '../../assets/close.svg'
import inComeImg from '../../assets/income.svg'
import outComeImg from '../../assets/outcome.svg'
import { Container, TransactionTypeContainer, RadioBox } from './styles'



interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    const [] = useState(0);
    
    
    
    const [type, setType] = useState('deposit');

    // o event é o evento desencadeado do submite que está no form
    async function handleCreateNewTRansaction(event: FormEvent){
        //essa função evita o carregamento da página após o clique no submit
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type 
        })

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }


    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={onRequestClose} 
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>    

            <Container onSubmit={handleCreateNewTRansaction}>
                <h2>Cadastrar transação</h2>

                <input 
                    placeholder="Titulo"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                
                <input
                    type="number" 
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button" 
                        onClick={() => { setType('deposit') }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={inComeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox 
                        type="button"
                        onClick={() => {setType('withdraw') }}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outComeImg} alt="Saida" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )

}
