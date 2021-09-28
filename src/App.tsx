import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import Modal from 'react-modal'

import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";

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
    <>
      <Header  onOpenNewTransectionModal={handleOpenNewTransectionModal}/>
      <Dashboard />
      ,<NewTransactionModal isOpen={isNewTransectionModalOpen} onRequestClose={handleCloseNewTransectionModal} />

      <GlobalStyle />
    </>
  );
}

