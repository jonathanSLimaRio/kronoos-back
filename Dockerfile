# Usar a imagem oficial do NestJS
FROM node:14-alpine

# Criar diretório de trabalho
WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar os arquivos do projeto
COPY . .

# Compilar a aplicação
RUN npm run build

# Iniciar a aplicação
CMD ["node", "dist/main"]
