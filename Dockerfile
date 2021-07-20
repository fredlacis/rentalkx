# Instala o container do node
FROM node

# Define um diretório para serem armazenados os arquivos de execução
WORKDIR /usr/app

# Copia o arquivo package.json para o diretório definido anteriormente
COPY package.json ./

# Roda o comando npm install para instalar todas as dependências
RUN npm install

# Copia todos os arquivos para o diretório de trabalho
COPY . .

# Expõe a porta na qual a api está sendo executada
EXPOSE 3333

# Executa a aplicação com o comando "run", agora com npm "npm run dev"
CMD ["npm","run","dev"]

# Docker Compose