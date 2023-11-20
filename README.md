<center>

# Projeto Integrador IV

</center>

## Desenvolvimento de sistemas orientado a dispositivos móveis e baseados na Web

---

<center>

### Integrantes - Grupo 20

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
   1. MONGO_URI={URL DE CONEXÃO AO MONGODB}
   2. JWT_SECRET={CHAVE SECRETA PARA ASSINAR O TOKEN}
   3. JWT_LIFETIME={TEMPO DE EXPIRAÇÃO DO TOKEN EM DIAS}
   4. NODE_ENV={AMBIENTE DO PROJETO}.

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
