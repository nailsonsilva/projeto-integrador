import Notificacao from "../../components/Notificacoes/Notificacoes";
import Sidebar from "../../components/shared/Sidebar";
import Velocimetro from "../../components/velocimetro/Chart";
import Calendario from "../../components/Calendario/Calendario";
import { useAuth } from "../../context/AuthContext";
import DayTip from "../../components/Card/DayTip";
import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import CardInfoEstoque from "../../components/CardInfoEstoque/CardInfoEstoque";

const Dashboard = () => {

  const dadosFaturamento = [
    {
      info: 'Prev. Fat. Mensal', valor: '10,5 mil', diferenca: '3,0 mil' 
    },
    {
      info: 'Despesas Mensais', valor: '4,5 mil', diferenca: '1,0 mil' 
    }
  ]

  return (
    <Sidebar>
      <Heading pl='10' mt='5' mb='10' fontSize='27px'>Seja bem vindo</Heading>
      <Flex w='100%' pl={10}>
        <Flex w='80%'>
          <Flex w='60%'>
            <Velocimetro />
          </Flex>
          <Flex w='40%' mr='10' flexDirection='column' alignItems='end'>
            {dadosFaturamento.map((dados) =>
              <CardInfoEstoque 
                info={dados.info}
                valor={dados.valor}
                diferenca={dados.diferenca}              
              />                                          
            )}
          </Flex>
        </Flex>
        <Flex w='20%'>
          <Calendario />
        </Flex>
      </Flex>
      <Flex mt='10'>
        <Flex w='80%' m='10' backgroundColor='#fff'>
          <Notificacao />
        </Flex>
        <Flex mt='20' w='20%'>
          <DayTip />
        </Flex>
      </Flex>
    </Sidebar>
  );
};
export default Dashboard;
