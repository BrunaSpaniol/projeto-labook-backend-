# Projeto Labook Backend

Este é o repositório do backend do projeto Labook, uma rede social desenvolvida como projeto de backend do bootcamp da Labenu. O Labook permite que os usuários criem contas, façam amizades, postem mensagens, comentários e curtam publicações de outros usuários.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- SQL e SQLite
- Knex
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento
- Postman

## Banco de Dados

![image](https://github.com/BrunaSpaniol/projeto-labook-backend-/assets/69273378/df7d3e87-8487-4f78-b404-d1823e643f9c)

## Requisitos



Endpoints

    signup
    login
    create post
    get posts
    edit post
    delete post
    like / dislike post

Autenticação e autorização

    identificação UUID
    senhas hasheadas com Bcrypt
    tokens JWT

Código

    POO
    Arquitetura em camadas
    Roteadores no Express
    

## Endpoints

A API do Labook possui as seguintes rotas e endpoints:

- **Signup**: Endpoint público utilizado para cadastro. Devolve um token jwt.
- **Login**: Realiza a autenticação do usuário e retorna um token JWT.
- **CreatePost**: Cria uma nova publicação para o usuário logado.
- **EditPost**: Cria uma nova publicação para o usuário logado.
- **Like**: Realiza uma curtida em uma publicação.
- **DELETE /delete**: Remove uma publicação.

Para obter mais detalhes sobre os parâmetros de cada requisição, consulte a [documentação da API](https://documenter.getpostman.com/view/14310239/U16nMj4v).

## Executando o servidor

Para executar o servidor, siga as instruções abaixo:

1. Clone o repositório:

```bash
git clone https://github.com/BrunaSpaniol/projeto-labook-backend.git
```

2. Instale as dependências do projeto:

```bash
cd projeto-labook-backend
npm install
```

3. Execute o servidor:

```bash
npm run start
```

O servidor será iniciado na porta 3000 por padrão.


## Contribuindo

Contribuições são bem-vindas! Se você encontrou algum problema no projeto, por favor, abra uma nova issue descrevendo o problema. Se desejar contribuir com código, por favor, abra um pull request com suas alterações.

Certifique-se de seguir as boas práticas de programação, incluindo testes e documentação adequados para as novas funcionalidades.


## Documentação da API

A documentação completa da API pode ser encontrada em https://documenter.getpostman.com/view/24822927/2s946bBEpk
