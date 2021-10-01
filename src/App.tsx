import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import Modal from 'react-modal'

import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";

// o provider do contexto precisa estar aqui para ficar disponível em qualquer transação
//poderíamos envolver o contexto apenas nas tags que precisam do acesso a essas dados
import { TransactiosProvider } from "./TransactionsContext";

Modal.setAppElement('#root')

export function App() {
  const [isNewTransectionModalOpen, setIsNewTransectionModalOpen] = useState(false);

  function handleOpenNewTransectionModal() {
      setIsNewTransectionModalOpen(true)
  }    
  
  function handleCloseNewTransectionModal() {
      setIsNewTransectionModalOpen(false)
  }


  return (
    <TransactiosProvider>
      <Header  onOpenNewTransectionModal={handleOpenNewTransectionModal}/>
      <Dashboard />
      ,<NewTransactionModal isOpen={isNewTransectionModalOpen} onRequestClose={handleCloseNewTransectionModal} />

      <GlobalStyle />
    </TransactiosProvider>
  );
}

