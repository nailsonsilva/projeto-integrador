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
        {produto: 'Azeite Gallo', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta voluptas'},
        {produto: 'Manteiga Ghee', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta voluptas'},
        {produto: 'Arroz Camil', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta voluptas'},
        {produto: 'Mel Puro', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta voluptas'},
        {produto: 'Leite Uht Integral', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis soluta voluptas'},
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