import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Sidebar from "../../components/shared/Sidebar";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,    
    Flex,
    Button,
    Heading,
    Text
  } from '@chakra-ui/react'

import arroz from "../../assets/arroz.png"
import azeite from "../../assets/azeite.png"
import leite from "../../assets/leite.png"
import manteiga from "../../assets/manteiga.png"
import mel from "../../assets/mel.png"
import { getProducts } from "../../services/products";


const Vendas = () => {
    
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [produtos, setProdutos] = useState([])
    
    useEffect( () => {
        getProducts().then (res =>{
        setProdutos(res)
       }); 
    })
    
    

    return(       
        <Sidebar>
            <Heading pl='10' mt='5' mb='10' fontSize='27px'>Produtos em promoção</Heading>
            <Flex p='10'>
                <Table variant='unstyled' borderRadius='20px'>
                    <Thead>
                        <Tr color='gray' fontSize='20px'>
                            <Th fontSize='16px' colSpan=''>Produto</Th>
                            <Th fontSize='16px'>Vendedor</Th>
                            <Th fontSize='16px'>Quantidade em estoque</Th>
                            <Th fontSize='16px'>Categoria</Th>
                            <Th fontSize='16px'>Preço</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {produtos.map((produto) =>
                            <Tr borderBottom='1px solid #f7f7f7'>                        
                                <Td w='30%' fontSize='14px'>
                                    <Flex alignItems="center">
                                        <img src={produto.imagem} alt="Imagem do produto" style={{ marginRight: '10px', width: '40px'}} />
                                        <Text fontWeight='600'>{produto.nome}</Text>
                                    </Flex>
                                </Td>
                                <Td w='20%' fontSize='14px'>{produto.vendedor}</Td>
                                <Td w='20%' fontSize='14px' color='red'>                                
                                    <p>{produto.quantidade}</p>
                                </Td>
                                <Td w='20%' fontSize='14px'>{produto.tipo}</Td>
                                <Td w='20%' fontSize='14px' fontWeight='700'>R$ {produto.preco} un</Td>                         
                                <Td w='10%' fontSize='14px'>
                                    <Button type={"button"} backgroundColor="#A3FFBF" width="22" borderRadius="24" onClick={() => {setOpenModal(true); setSelectedProduct(produto)}}>
                                        Comprar
                                    </Button>
                                </Td>                   
                            </Tr>  
                        )}             
                    </Tbody>
                </Table>
            </Flex>
            <Modal isOpen={openModal} productSelected={selectedProduct} setModalOpen={() => setOpenModal(!openModal)} />
        </Sidebar>
    );
}

export default Vendas;