# Desafio Aiqfome

Este projeto é uma API desenvolvida com [NestJS](https://nestjs.com/) para o desafio Aiqfome.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado: versão 20 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [npm](https://www.npmjs.com/)

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone <git@github.com:albertolemos/desafio-aiqfome.git>
cd desafio-aiqfome
```

### 2. Suba o banco de dados com Docker Compose

```bash
docker-compose up -d
```

Isso irá iniciar um container PostgreSQL configurado conforme o arquivo `docker-compose.yml`.

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as configurações do banco. Exemplo:

```
NODE_ENV=dev
PORT=3000

POSTGRES_DB=aiqfome
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aiqfome
```

Ajuste conforme necessário.

### 5. Rode as migrations do Prisma

```bash
npx prisma migrate dev
```

### 6. Rode a aplicação localmente

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

### 7. Documentação da API

Acesse a documentação Swagger em:

```
http://localhost:3000/docs
```

## Observações

- O banco de dados roda em container Docker, mas a API roda localmente na sua máquina.
- Certifique-se de que a porta 5432 está livre para o PostgreSQL.
- Para resetar o banco, use:

```bash
npx prisma migrate reset
```

---

Desenvolvido para o desafio Engenheiro(a) de Software SR | APIs e Backoffice | L2L Aiqfome .
