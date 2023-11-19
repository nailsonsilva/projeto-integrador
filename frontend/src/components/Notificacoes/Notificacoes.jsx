import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const Notificacao = () => {
  const itens = [
    {
      produto: "Azeite Gallo",
      descricao: "Azeite de Oliva Extra Virgem - Vidro 500ML",
    },
    { produto: "Manteiga Ghee", descricao: "Manteiga Com Sal - 200G" },
    { produto: "Arroz Camil", descricao: "Arroz Branco Agulha Tipo 1 - 1KG" },
    { produto: "Mel Puro", descricao: "Mel das Abelhinhas - 450G" },
    { produto: "Leite Uht Integral", descricao: "Leite UHT Integral - 1L" },
  ];

  return (
    <Table variant="unstyled">
      <Thead>
        <Tr color="gray" backgroundColor="#F6F9FC" fontSize="20px">
          <Th fontSize="16px">Item</Th>
          <Th fontSize="16px">Descricao</Th>
        </Tr>
      </Thead>
      <Tbody>
        {itens.map((item, index) => (
          <Tr borderBottom="1px solid #f7f7f7" key={index}>
            <Td w="50%" fontSize="14px">
              {item.produto}
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
