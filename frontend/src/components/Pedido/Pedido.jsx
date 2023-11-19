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
import React from 'react';
import { useNavigate  } from 'react-router-dom';

const MODAL_STYLE = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '650px',
  backgroundColor: '#fff',
  borderRadius: '12px',
}

const BACKGROUND_STYLE = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'rgb(0,0,0,0.7)',
  zIndex: '1000'
}

const Pedido = ({isOpen, precoTotal}) => {

  var dataHoraAtual = new Date();
  var options = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false, 
    timeZone: 'America/Sao_Paulo' 
  };
  var dataHoraFormatada = dataHoraAtual.toLocaleString('pt-BR', options);

  const navigate = useNavigate();
  const handleCloseModal = () => {
    navigate('/');
  };

  if(isOpen){
    return (
      <div style={BACKGROUND_STYLE}>
        <div style={MODAL_STYLE}>
            <Card p='10'>
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
                        {dataHoraFormatada}
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
                         R$ {precoTotal.toFixed(2).replace('.', ',')}
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
                  onClick={handleCloseModal}
                >
                  Fechar
                </Button>
              </Center>
            </Card>
        </div>
      </div>
    );
  }

  return null;

};
export default Pedido;
