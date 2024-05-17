import { Table, Thead, Tbody, Tr, Th, Td, Flex, Button, Heading, Text } from "@chakra-ui/react";

const Pedidos = () => {
    const pedidos = [  
        {item: "Manteiga Ghee", descricao: "10 fardos do produto" },
        {item: "Arroz Camil", descricao: "6 fardos do produto" },
        {item: "Mel Puro", descricao: "4 fardos do produto" },
        {item: "Leite Integral Betânia", descricao: "1 fardo do produto" },
        {item: "Creme Dental Colgate", descricao: "1 fardo do produto" },
        {item: "Óleo de soja", descricao: "2 fardos do produto" },
        {item: "Café Três corações", descricao: "19 fardos do produto" },
        {item: "Papel Higiênico", descricao: "7 fardos do produto" },
        {item: "Açúcar Refinado União", descricao: "6 fardos do produto" },
    ];

    return (
        <Table variant="unstyled">
            <Thead>
                <Tr color="gray" backgroundColor="#F6F9FC" fontSize="20px">
                    <Th fontSize="16px">Item</Th>
                    <Th fontSize="16px">Descrição</Th>
                </Tr>
            </Thead>
            <Tbody>
                {pedidos.map((item, index) => (
                    <Tr borderBottom="1px solid #f7f7f7" key={index}>
                        <Td w="50%" fontSize="16px">
                            <Flex alignItems="Center">
                                <Text fontWeight='600'>{item.item}</Text>
                            </Flex>
                        </Td>
                        <Td w="50%" fontSize="14px">
                            {item.descricao}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Pedidos;
