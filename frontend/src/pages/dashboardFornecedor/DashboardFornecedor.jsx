import { Flex, Heading } from "@chakra-ui/react";
import Sidebar from "../../components/shared/Sidebar";
import Calendario from "../../components/Calendario/Calendario";
import DayTip from "../../components/Card/DayTip";
import Pedidos from "../../components/Pedidos/Pedidos";
import CardInfoEstoque from "../../components/CardInfoEstoque/CardInfoEstoque";

const DashboardFornecedor = () => {
    const dadosFaturamento = [
        {
          info: "Prev. Fat. Mensal",
          valor: "20,5 mil",
          diferenca: "3,0 mil",
        },
        {
          info: "Despesas Mensais",
          valor: "15,5 mil",
          diferenca: "1,0 mil",
        },
      ];

    return (
        <Sidebar tipoUsuario="fornecedor">
            <Heading pl="10" mt="5" mb="10" fontSize="27px">
                Seja bem vindo
            </Heading>
            <Flex w="100%" pl={10}>
                <Flex w="80%">
                    <Flex w="100%" h="60%">
                        {dadosFaturamento.map((dados, index) => (
                            <CardInfoEstoque
                                info={dados.info}
                                valor={dados.valor}
                                diferenca={dados.diferenca}
                                key={index}
                            />
                        ))}
                    </Flex>
                </Flex>
                <Flex w="25%">
                    <Calendario />
                </Flex>
            </Flex>
            <Flex mt="10">
                <Flex w="80%" m="10" backgroundColor="#fff">
                    <Pedidos />
                </Flex>
                <Flex mt="20" w="20%">
                    <DayTip 
                        title={"Alimento mais buscado do dia"}
                        fornecedor={"Comprador: Padaria Três Irmãos"}
                        mensagem={"Arroz Branco Tipo I Vasconcelos"}                    
                    />
                </Flex>
            </Flex>
        </Sidebar>
    );
}

export default DashboardFornecedor;