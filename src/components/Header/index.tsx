import { useState } from 'react'
import logoImg from '../../assets/logo.svg'

import { Container, Content } from './styles'

interface HeaderProps {
    onOpenNewTransectionModal: () => void;
}

export function Header({onOpenNewTransectionModal}: HeaderProps) {

    return (
    <Container>
        <Content>
            <img src={logoImg} alt="th money" />
            <button type="button" onClick={onOpenNewTransectionModal}>
                Nova transação
            </button>
        </Content>

    </Container>
    )
}
