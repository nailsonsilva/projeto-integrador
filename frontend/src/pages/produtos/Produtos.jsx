import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import Sidebar from "../../components/shared/Sidebar";
import { Flex, Heading, Box, Text, Image, Grid, Button } from "@chakra-ui/react";

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProducts();
                setProdutos(res);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Sidebar tipoUsuario="fornecedor">
            <Heading pl="10" mt="5" mb="10" fontSize="27px">
                Meus Produtos
            </Heading>
            <Flex justify="flex-end" mb={4}>
                <Button
                    style={{ backgroundColor: 'green', color: 'white', marginRight: '8px' }}
                >
                    Adicionar Produto
                </Button>
                <Button
                    style={{ backgroundColor: 'brown', color: 'white' }}
                >
                    Editar Produtos
                </Button>
            </Flex>
            <Flex w="100%" pl={10} flexDirection="column">
                {error && <Text color="red.500">{error}</Text>}
                {produtos.length > 0 ? (
                    <Grid templateColumns="repeat(6, 1fr)" gap={6}>
                        {produtos.map((produto) => (
                            <Box key={produto.id} p={5} shadow="md" borderWidth="1px">
                                <Image src={produto.imagem} alt={produto.nome} boxSize="150px" objectFit="cover" mb={4} />
                                <Heading fontSize="xl">{produto.nome}</Heading>
                                <Text mt={2}>R${produto.preco}</Text>
                            </Box>
                        ))}
                    </Grid>
                ) : (
                    <Text>Nenhum produto encontrado</Text>
                )}
            </Flex>
        </Sidebar>
    );
};

export default Produtos;
