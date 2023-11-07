import Notificacao from "../../components/Notificacoes/Notificacoes";
import Sidebar from "../../components/shared/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { Flex, Heading} from '@chakra-ui/react'

const Dashboard = () => {
  // const { logoutUser } = useAuth();
  return (
    <Flex
      h='100vh'
      flexDir='row'
      overflow='hidden'
      backgroundColor='#F8F8F8'
    >
      {/* sidebar */}
      <Flex
        maxW='15%'
        flexDir='column'
        alignItems='center'
      >
        <Sidebar />

      </Flex>

      {/* Coluna 2 */}
      <Flex
        minW='55%'
        p='4%'
        flexDir='column'
        overflow='auto'
        minH='100vh'
      >
        <Heading fontSize='24px'>Welcome Back!</Heading>
        <Flex flexDir='column' backgroundColor='#fff' mt='10' borderRadius='4px'>
          <Flex justifyContent='center' p='5'>   
              <Heading fontSize='20px'>Notificações</Heading>          
          </Flex>
          <Flex flexDir='column'>
            <Flex overflow='auto'>
              <Notificacao />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* coluna 3 */}
      <Flex
        w="30%"
        bgColor=''
        p='3%'
        flexDir='column'
        overflow='auto'
      >
      </Flex>
    </Flex>
  );
};
export default Dashboard;
