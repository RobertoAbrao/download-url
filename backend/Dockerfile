# Usando uma imagem oficial do Node.js com suporte a ffmpeg
FROM jrottenberg/ffmpeg:4.4-ubuntu

# Instalando dependências
RUN apt-get update && apt-get install -y wget curl \
    && wget -O /usr/local/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

# Criando diretório de trabalho
WORKDIR /app

# Copiando os arquivos do projeto para o container
COPY . .

# Instalando dependências do Node.js
RUN npm install

# Definir porta que o Render usará
ENV PORT=10000

# Iniciar servidor
CMD ["node", "server.js"]
