# Desafio Aiqfome

Este projeto é uma API desenvolvida com [NestJS](https://nestjs.com/) para o desafio Aiqfome.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado: versão 20 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [npm](https://www.npmjs.com/)

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone git@github.com:albertolemos/desafio-aiqfome.git
```

### 2. Acesse a pasta do projeto

```bash
cd desafio-aiqfome
```

### 3. Crie as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as configurações do banco e do JWT. Exemplo:

```
NODE_ENV=dev
PORT=3000

# Configurações do Banco de Dados
POSTGRES_DB=aiqfome
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATABASE_URL=postgresql://admin:admin@localhost:5432/aiqfome

# Configuração do JWT
JWT_SECRET=aiqfome
JWT_EXPIRES_IN=1d
```

### 4. Suba o banco de dados com Docker Compose

```bash
docker-compose up -d
```

Isso irá iniciar um container PostgreSQL configurado conforme o arquivo `docker-compose.yml`.

### 5. Instale as dependências

```bash
npm install
```

### 6. Rode as migrations do Prisma

```bash
npx prisma migrate dev
```

### 7. Rode a aplicação localmente

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

### 8. Documentação da API

Acesse a documentação Swagger em:

```
http://localhost:3000/docs
```

## Autenticação e Autorização

A API utiliza autenticação JWT (JSON Web Token) para proteger as rotas. Para acessar as rotas protegidas:

1. Primeiro, crie um usuário através da rota `POST /users`
2. Faça login usando a rota `POST /auth/login` com suas credenciais
3. Use o token JWT retornado no header `Authorization` das requisições:
   ```
   Authorization: Bearer <seu_token_jwt>
   ```

### Rotas Protegidas

As seguintes rotas requerem autenticação:

- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Buscar usuário por ID
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Rotas Públicas

- `POST /users` - Criar novo usuário
- `POST /auth/login` - Realizar login

### Adicionar ou remover produtos favoritos

Para gerenciar a lista de produtos favoritos de um usuário, envie uma requisição `PUT` para a rota `PUT /users/:id`, incluindo a chave `favorites` no corpo da requisição. O valor deve ser um array de IDs numéricos dos produtos desejados como favoritos.

**Exemplo de payload:**

```json
{
  // demais campos do usuário
  "favorites": [1, 2, 3, 5, 8, 13]
}
```

> **Observação:**  
> Ao enviar o array `favorites`, ele substituirá a lista atual de favoritos do usuário. Para remover todos os favoritos, envie um array vazio.

## Observações

- O banco de dados roda em container Docker, mas a API roda localmente na sua máquina.
- Certifique-se de que a porta 5432 está livre para o PostgreSQL.
- O token JWT expira em 1 dia após sua emissão.
- Para resetar o banco, use:

```bash
npx prisma migrate reset
```

## Escolha das tecnologias

- **Node.JS**: É tecnologia que uso no trabalho e na maioria dos meus projetos pessoais, além de ser a stack que tenho o maior domínio dentre as stacks propostas para este desafio;
- **NestJS**: Me acompanha também no meu dia-a-dia e que traz uma robustez e organização mesmo em projetos pequenos, como neste desafio, mas que já prepara para o crescimento e evolução;

- **PostgreSQL**: É o banco de dados padrão na maioria dos projetos e que também foi sugerido;

- **Docker**: Facilita a instalação e subida da aplicação, em especial, o banco de dados;

- **Prisma**: Um dos melhores ORMs na minha opinião, que facilita a vida do dev por sua simplicidade na relação com o banco de dados nos projetos Node.JS e TypeScript, robustez em suas consultas fortemente tipadas, o que coopera para uma legibilidade e manutenabilidade do código;

- **Swagger**: Praticidade e legibilidade são as palavras que melhor definem o Swagger para documentação de APIs RESTful.

---

Desenvolvido por [Alberto](https://github.com/albertolemos) para o desafio Engenheiro(a) de Software SR | APIs e Backoffice | L2L Aiqfome .
