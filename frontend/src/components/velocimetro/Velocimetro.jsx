import { Progress, Stack } from "@chakra-ui/react";
import React from "react";

const Velocimetro = ({ value }) => {
  return (
    <Stack spacing={5}>
      <Progress colorScheme="green" height="32px" value={value} />
    </Stack>
  );
};

export default Velocimetro;
