import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PiCheckCircleFill } from "react-icons/pi";

const Pedido = () => {
  return (
    <>
      <Heading fontSize="24px">Pedido</Heading>
      <Flex
        flexDir="column"
        backgroundColor="#fff"
        mt="10"
        borderRadius="4px"
        width="40vw"
      >
        <Card>
          <Flex flexDir="column" alignContent="center">
            <Center>
              <Heading
                size="xs"
                textTransform="uppercase"
                p="2.5"
                color="#8BBF61"
              >
                PEDIDO REALIZADO COM SUCESSO
              </Heading>
            </Center>
            <Center>
              <Icon fontSize="32" color="#23A26D" as={PiCheckCircleFill} />
            </Center>
          </Flex>

          <Box>
            <CardBody>
              <Stack
                spacing="1"
                backgroundColor="#F7FAFC"
                p="5"
                borderRadius="24"
              >
                <Box display="grid" gridTemplateColumns="1fr 1fr">
                  <Text pt="2" fontSize="sm" color="gray.400">
                    Ref Number
                  </Text>
                  <Text pt="2" fontSize="sm" fontWeight="600">
                    000085752257
                  </Text>
                </Box>
                <Box display="grid" gridTemplateColumns="1fr 1fr">
                  <Text pt="2" fontSize="sm" color="gray.400">
                    Data do Pagamento
                  </Text>
                  <Text pt="2" fontSize="sm" fontWeight="600">
                    25-02-2023, 13:22:16
                  </Text>
                </Box>
                <Box display="grid" gridTemplateColumns="1fr 1fr">
                  <Text pt="2" fontSize="sm" color="gray.400">
                    Método de Pagamento
                  </Text>
                  <Text pt="2" fontSize="sm" fontWeight="600">
                    Boleto
                  </Text>
                </Box>
                <Box display="grid" gridTemplateColumns="1fr 1fr">
                  <Text pt="2" fontSize="sm" color="gray.400">
                    Nome
                  </Text>
                  <Text pt="2" fontSize="sm" fontWeight="600">
                    Restaurante Mil e um Sabores
                  </Text>
                </Box>
                <Divider variant="dashed" mt="2.5" />
                <Box display="grid" gridTemplateColumns="1fr 1fr">
                  <Text pt="2" fontSize="sm" color="gray.400">
                    Valor
                  </Text>
                  <Text pt="2" fontSize="sm" fontWeight="600">
                    R$ 190,00
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Box>
          <Center m="2.5">
            <Button
              type={"button"}
              backgroundColor="#A3FFBF"
              width="32"
              borderRadius="24"
            >
              Fechar
            </Button>
          </Center>
        </Card>
      </Flex>
    </>
  );
};
export default Pedido;
