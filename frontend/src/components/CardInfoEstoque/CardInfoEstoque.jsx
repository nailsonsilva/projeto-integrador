import { Box, Flex, Text } from "@chakra-ui/react";
import { BsArrowUpShort } from "react-icons/bs";

const CardInfoEstoque = (props) => {
  return (
    <Box
      borderRadius="20"
      w="300px"
      border="4px solid #468B97"
      textAlign="center"
      p="5"
      mb="2"
      mr="2"
    >
      <Text color="#474646" fontSize="21px" fontWeight="600" mb="2">
        {props.info}
      </Text>
      <Text color="#474646" fontSize="24px" fontWeight="700" mb="2">
        {props.valor}
      </Text>
      <Text
        color="#008000"
        fontSize="18px"
        fontWeight="500"
        mb="2"
        display="block ruby"
      >
        <BsArrowUpShort />
        {props.diferenca}
      </Text>
    </Box>
  );
};

export default CardInfoEstoque;
