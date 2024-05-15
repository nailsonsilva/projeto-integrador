import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Produto = () => {
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState(null);
  const productId = "664529702079533f590fc416";

  const authFetch = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/api/v1",
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Selecione um arquivo!");
      return;
    }

    const formData = new FormData();
    formData.append("imagem", file);

    await authFetch.post(`/products/uploads/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const getProductById = async (productId) => {
    const response = await authFetch.get(`/products/${productId}`);
    setProduct(response.data);
  };

  const getImagePath = (imageName) => {
    return require(`../../public/uploads/${imageName}`);
  };

  useEffect(() => {
    getProductById(productId);
  }, []);

  return (
    <Box p={4}>
      <FormControl>
        <FormLabel htmlFor="imagem">Enviar imagem:</FormLabel>
        <Input type="file" id="imagem" onChange={handleFileChange} />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
        Enviar imagem
      </Button>
      {product && <img src={getImagePath(product.product.imagem)} />}
    </Box>
  );
};

export default Produto;
