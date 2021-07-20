# Requisitos

## Cadastro de carro

### Requisitos Funcionais
- Deve ser possível cadastrar um novo carro
- Deve ser possível listar todas as categorias

### Regras de Negócio
- Não deve ser possível cadastrar um carro com uma placa já existente
- Não deve ser possível alterar a placa de um carro já cadastrado
- O carro deve ser cadastrado com disponibilidade por padrão
- Apenas usuários administradores podem cadastrar novos carros

---

## Listagem de carros

### Requisitos Funcionais
- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- Deve ser possível listar todos os carros disponíveis pelo nome da marca
- Deve ser possível listar todos os carros disponíveis pelo nome do carro

### Regras de Negócio
- O usuário não precisa estar logado no sistema

---

## Cadastro de especificação no carro

### Requisitos Funcionais
- Deve ser possível cadastrar uma especificação para um carro
- Deve ser possível listar todas as especificações
- Deve ser possível listar todos os carros

### Regras de Negócio
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
- Apenas usuários administradores podem cadastrar novas especificações

---

## Cadastro de imagens do carro

### Requisitos Funcionais
- Deve ser possível cadastrar a imagem do carro
- Deve ser possível listar todos os carros

### Requisitos não Funcionais
- Utilizar o multer para o upload dos arquivos

### Regras de Negócio
- O usuário deve poder cadastrar mais de uma imagem para o carro
- Apenas usuários administradores podem cadastrar novas imagens

---

## Aluguel

### Requisitos Funcionais
- Deve ser cadastrar um aluguel

### Requisitos não Funcionais

### Regras de Negócio
- O aluguel deve ter duração minima de 24h
- Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo carro
