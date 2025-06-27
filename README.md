# API de Produtos

## Visão Geral do Projeto

Esta API RESTful é um sistema para gerenciamento de produtos, desenvolvida com **Node.js** e **Express.js**. Ela se conecta a um banco de dados **PostgreSQL** (hospedado via Neon.tech) e oferece todas as operações **CRUD (Criar, Ler, Atualizar, Excluir)** para produtos e suas associações a categorias.

## Tecnologias Utilizadas

- **Node.js**
- **Express.js** (Framework web)
- **PostgreSQL** (Banco de dados relacional, utilizando Neon.tech)
- `dotenv` (Para gerenciar variáveis de ambiente)
- `pg` (Driver PostgreSQL para Node.js)
- Postman ou Insomnia (Para testes de API)

## Configuração e Execução

### 1. Pré-requisitos

Certifique-se de ter instalado:

- Node.js ([download](https://nodejs.org/en/download/))
- Postman ou Insomnia
- Conta Neon.tech (para o banco de dados PostgreSQL)

### 2. Configuração do Projeto

1.  Clone o repositório ou navegue até a pasta do projeto:
    ```bash
    git clone [https://github.com/seu_usuario/product-api.git](https://github.com/seu_usuario/product-api.git)
    cd product-api
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```

### 3. Configuração do Banco de Dados (Neon.tech)

1.  **Obtenha a Connection String:**
    - No seu painel do Neon.tech, selecione seu projeto.
    - Vá para a seção "Connect" e **copie a "Connection string" completa**.
2.  **Configure `src/app.js`:**
    - No arquivo `src/app.js`, localize a configuração do `Pool` e cole sua "Connection string" nela:
      ```javascript
      // Exemplo em src/app.js:
      const pool = new Pool({
        connectionString: "COLE_SUA_CONNECTION_STRING_COMPLETA_DO_NEON_AQUI",
      });
      ```
    - Certifique-se de que outras configurações de `user`, `host`, `password`, `port`, `ssl` estejam comentadas ou removidas no objeto `Pool`.
3.  **Crie as Tabelas:**
    - Abra `create_tables.sql` no seu editor.
    - No Neon.tech, vá para o "SQL Editor".
    - Cole o conteúdo de `create_tables.sql` (que define `categorias` e `produtos`) e execute-o para criar as tabelas no seu banco de dados.
4.  **Dados Iniciais (Opcional):**
    - Para testar, você pode inserir algumas categorias e produtos diretamente via "SQL Editor" no Neon.tech.
      ```sql
      INSERT INTO categorias (nome, descricao) VALUES ('Eletrônicos', 'Dispositivos diversos.');
      -- ...
      ```

### 4. Iniciar a API

1.  No terminal, na raiz do projeto (`product-api`):
    ```bash
    npm start
    ```
2.  Confirme a mensagem: `Server is running on port 3000`.

## Testando a API com Postman/Insomnia

A URL base para todos os endpoints é `http://localhost:3000/api`.

- **`GET /products`**: Lista todos os produtos existentes.
- **`GET /products/:id`**: Busca um produto específico pelo ID.
- **`POST /products`**: Cria um novo produto.
  - **Body (raw, JSON):** `{ "nome": "Ex: Smartphone", "descricao": "Ex: Tela OLED", "preco": 1234.50, "categoria_id": 1 }`.
- **`PUT /products/:id`**: Atualiza um produto existente.
  - **Body (raw, JSON):** `{ "preco": 1100.00 }` (apenas campos a atualizar).
- **`DELETE /products/:id`**: Remove um produto.

## Estrutura do Projeto

- `src/controllers/`: Contém a lógica de negócio (CRUD) para produtos.
- `src/routes/`: Define os endpoints da API para produtos.
- `src/app.js`: Configuração principal do servidor Express e conexão com o banco de dados.
- `.env`: Armazena variáveis de ambiente.
- `create_tables.sql`: Script para criação das tabelas `categorias` e `produtos` no banco de dados.
