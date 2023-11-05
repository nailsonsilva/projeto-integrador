import Sidebar from "../../components/shared/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { Flex, Grid, GridItem, Heading } from '@chakra-ui/react'

const Dashboard = () => {
  const { logoutUser } = useAuth();
  return (
    <Flex
      h='100vh'
      flexDir='row'
      overflow='hidden'
    >
      {/* sidebar */}
      <Flex
        w='8%'
        flexDir='column'
        alignItems='center'
      >
        <Sidebar />

      </Flex>

      {/* Coluna 2 */}
      <Flex
        w='62%'
        p='3%'
        flexDir='column'
        overflow='auto'
        minH='100vh'
      >
        <Heading>Welcome Back!</Heading>

      </Flex>

      {/* coluna 3 */}
      <Flex
        w="30%"
        bgColor='#f5f5f5'
        p='3%'
        flexDir='column'
        overflow='auto'
      >
      </Flex>
    </Flex>
  );
};
export default Dashboard;
