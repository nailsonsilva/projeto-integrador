import { Table, Thead, Tbody, Tr, Th, Td, Flex, Button, Heading, Text } from "@chakra-ui/react";

import arroz from "../../assets/arroz.png"
import azeite from "../../assets/azeite.png"
import leite from "../../assets/leite.png"
import manteiga from "../../assets/manteiga.png"
import mel from "../../assets/mel.png"


const Notificacao = () => {
  const itens = [
    {
      imagem: azeite, produto: "Azeite Gallo",
      descricao: "Azeite de Oliva Extra Virgem - Vidro 500ML",
    },
    { imagem: manteiga, produto: "Manteiga Ghee", descricao: "Manteiga Com Sal - 200G" },
    { imagem: arroz, produto: "Arroz Camil", descricao: "Arroz Branco Agulha Tipo 1 - 1KG" },
    { imagem: mel, produto: "Mel Puro", descricao: "Mel das Abelhinhas - 450G" },
    { imagem: leite, produto: "Leite Uht Integral", descricao: "Leite UHT Integral - 1L" },
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
        {itens.map((item, index) => (
          <Tr borderBottom="1px solid #f7f7f7" key={index}>
            <Td w="50%" fontSize="14px">
              {item.produto}
              <Flex alignItems="rigth">
                <img src={item.imagem} alt="Imagem do produto" style={{ marginRight: '50px', width: '18px'}} />
                 <Text fontWeight='600'>{item.produto}</Text>
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

export default Notificacao;
