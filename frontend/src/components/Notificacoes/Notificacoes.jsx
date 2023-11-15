import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,    
  } from '@chakra-ui/react'

const Notificacao = () => {

    const itens = [
        {produto: 'teste', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta voluptas'},
        {produto: 'teste', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta voluptas'},
        {produto: 'teste', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta voluptas'},
        {produto: 'teste', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta voluptas'},
        {produto: 'teste', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta voluptas'},
    ]

    return(
        <Table variant='unstyled'>
            <Thead>
                <Tr color='gray' backgroundColor="#F6F9FC" fontSize='20px'>
                    <Th fontSize='16px'>Item</Th>
                    <Th fontSize='16px'>Descricao</Th>
                </Tr>
            </Thead>
            <Tbody>
                {itens.map((item) =>
                    <Tr borderBottom='1px solid #f7f7f7'>                        
                        <Td w='50%' fontSize='14px'>{item.produto}</Td>
                        <Td w='50%' fontSize='14px'>{item.descricao}</Td>
                    </Tr>  
                )}             
            </Tbody>
        </Table>
    );
}

export default Notificacao;