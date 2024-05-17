import { Button } from '@chakra-ui/react'
import React from 'react'
import { FaPlusSquare } from "react-icons/fa";
import { FaRegMinusSquare } from "react-icons/fa";
import { CloseButton } from '@chakra-ui/react'
import { useState } from 'react';
import Pedido from '../Pedido/Pedido';
import { buyProduct } from '../../services/products';
import { errorNotification } from '../../services/notification';

export default function Modal({isOpen, children, setModalOpen, productSelected}) {

    const [quantidade, setQuantidade] = useState(1);
    const [openModalSucess, setOpenModalSucess] = useState(false);

    const handleIncrement = () => {
        setQuantidade(quantidade + 1);
    };

    const handleDecrement = () => {
        if (quantidade > 1) {
        setQuantidade(quantidade - 1);
        }
    };

    const handleSubmit = () => {
        const params = {
            id: productSelected._id,
            quantidade: quantidade,
        }
        buyProduct(params).then(response => {
            setOpenModalSucess(true);
        }, error => {        
            errorNotification(error.code, error.response.data.msg);
        });
    };

    const precoTotal = productSelected ? quantidade * parseFloat(productSelected.preco) : 0;

    if(isOpen){
        return (
            <div style={BACKGROUND_STYLE}>
                <div style={MODAL_STYLE}>
                    <div style={MODAL_TITLE}>
                        <h3>CONFIRME O PERDIDO</h3>
                        <CloseButton onClick={setModalOpen} />
                    </div>
                    <div style={MODAL_MAIN}>
                        <div style={MODAL_INFO_PRODUCT}>
                            <h4 style={{marginBottom:'40px'}}>{productSelected.nome}</h4>
                            <img src={productSelected.imagem} alt="" />
                        </div>
                        <div style={MODAL_QTD_PRODUCT}>
                            <div style={{display: 'flex', justifyContent: 'space-around', alignitems: 'center'}}>
                                <div>
                                    <span>QUANTIDADE</span>
                                    <div style={{ display: 'flex', alignItems:'center', backgroundColor: '#fff', alignContent: 'center', justifyContent: 'center', marginTop: '10px'}}>
                                        <FaPlusSquare style={{cursor: 'pointer'}} onClick={handleIncrement} />
                                        <span style={{padding: '0px 10px'}}>{quantidade}</span>
                                        <FaRegMinusSquare style={{cursor: 'pointer'}} onClick={handleDecrement} />
                                    </div>
                                </div>
                                <div>                                    
                                    <span style={{color: '#8EAC50', fontSize: '34px', fontWeight:'500'}}>R$ {precoTotal.toFixed(2).replace('.', ',')}</span>
                                </div>
                            </div>                         
                            <Button style={{ marginTop: '40px', backgroundColor: "#A3FFBF" }} onClick={() => {handleSubmit();}}>Confirmar</Button>
                        </div>
                    </div>
                </div>
                <Pedido isOpen={openModalSucess} precoTotal={precoTotal} />
            </div>            
        )
    }

    return null
}

const MODAL_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '650px',
    height: '450px',
    backgroundColor: '#fff',
    borderRadius: '12px',
}

const BACKGROUND_STYLE = {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgb(0,0,0,0.7)',
    zIndex: '1000'
}

const MODAL_TITLE = {
    backgroundColor: '#8EAC50',
    padding: '20px',
    borderRadius: '12px 12px 0px 0px',
    color: '#fff',
    fontSize: '24px',
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'space-between'
}

const MODAL_MAIN = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around'
}

const MODAL_INFO_PRODUCT = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const MODAL_QTD_PRODUCT = {
    backgroundColor: 'rgba(142, 172, 80, 0.10)',
    borderRadius: '10px',
    width: '350px', 
    marginTop: '20px',
    textAlign: 'center',
    padding: '20px'
}