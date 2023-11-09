import Notificacao from "../../components/Notificacoes/Notificacoes";
import Sidebar from "../../components/shared/Sidebar";
import Velocimetro from "../../components/velocimetro/Chart";
import Calendario from "../../components/Calendario/Calendario";
import { Flex, Heading } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Sidebar>
      {/* Coluna 2 */}
      <Flex minW="55%" p="4%" flexDir="column" overflow="auto" minH="100vh">
        <Heading fontSize="24px">Situação do Estoque</Heading>
        <Flex
          flexDir="column"
          backgroundColor="#fff"
          mt="10"
          borderRadius="4px"
        >
          <Velocimetro value={40} />
        </Flex>
        <Heading fontSize="24px">Calendário</Heading>
        <Flex
          flexDir="column"
          backgroundColor="#fff"
          mt="10"
          borderRadius="4px"
        >
          <Calendario />
        </Flex>

        <Heading fontSize="24px" mt="10">
          Bem-vindo novamente!
        </Heading>
        <Flex
          flexDir="column"
          backgroundColor="#fff"
          mt="10"
          borderRadius="4px"
        >
          <Flex justifyContent="center" p="5">
            <Heading fontSize="20px">Notificações</Heading>
          </Flex>
          <Flex flexDir="column">
            <Flex overflow="auto">
              <Notificacao />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* coluna 3 */}
      <Flex w="30%" bgColor="" p="3%" flexDir="column" overflow="auto"></Flex>
    </Sidebar>
  );
};
export default Dashboard;
