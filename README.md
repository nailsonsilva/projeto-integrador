<center>

# Projeto Integrador V

</center>

## Análise de Soluções Integradas para Organizações

---

<center>

### Integrantes - Grupo 38

</center>


- CAROLINA BORGES DE FARIAS
- DEBORA ALMEIDA GONCALVES
- DIEGO BATISTA PEREIRA
- GABRIELA FACCIOLI SOUTO DA SILVA
- KAROLINE BENIGNO BORGES
- MARCIANO QUELHA MARINHEIRO JUNIOR
- NAILSON AFONSO DA SILVA
- PEDRO AMERICANO DO BRASIL

---

## Apresentação do projeto

O sistema estoquix é solução tecnológica de qualidade, que auxilia organizações de pequeno porte na gestão de seu estoque, evitando que haja disperdícios de recursos e erros operacionais / logísticos ao longo de seus processos de negócio.

As funcionalidades implementadas foram as seguintes:**cadastrar usuário**, **realizar login** e **fazer pedido**, sendo que o fluxo de uso foi baseado na jornada de usuário da persona - Gerente de restaurante. Esta persona, por meio da sugestão de compra do assistente virtual, realiza o pedido de compra de determinado produto para abastecer o estoque de seu estabelecimento.

### Tecnologias Utilizadas

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Configuração

Antes de instalar e iniciar o projeto, siga estas etapas:

1. Copie a URL do repositório para fazer o clone.
2. Clone o repositório do projeto em um diretório local. Utilize o seguinte comando seguido da URL que foi copiada no passo anterior:

```bash

git clone

```

3. Crie um arquivo **.env** na raiz da pasta **"Backend"**.
4. Adicione as seguintes propriedades no arquivo ".env":
   1. MONGO_URI= mongodb+srv://SenacPTI:pdx8mrkebSutsKVH@nodeexpresscourse.3spgveu.mongodb.net/senac?retryWrites=true&w=majority
   2. JWT_SECRET= &E)H@McQfTjWnZr4u7w!z%C*F-JaNdRg
   3. JWT_LIFETIME=30d
   4. NODE_ENV="development"

### Instalação

siga as instruções a seguir para instalar e iniciar o projeto localmente:

```bash

# Instale as dependências do projeto
cd Backend
npm install

# Inicie o servidor Node.js
npm start

# Em outra janela do terminal, inicie o cliente React.js
cd Frontend
npm install
npm start

```

---
