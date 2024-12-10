# Use uma imagem oficial do Node.js como base
FROM node:20

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie apenas os arquivos necessários para instalar dependências
COPY package.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código para o diretório de trabalho no container
COPY . .

RUN npm run build
# Exponha a porta que o backend usará
EXPOSE 3000

# Comando para iniciar a aplicação em ambiente de desenvolvimento
CMD ["npm", "run", "start:dev"]
