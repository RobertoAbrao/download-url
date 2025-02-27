# Usar uma imagem do Node.js com suporte ao FFmpeg
FROM node:18-bullseye

# Atualizar pacotes e instalar FFmpeg e yt-dlp
RUN apt-get update && apt-get install -y wget ffmpeg \
    && wget -O /usr/local/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

# Criar diretório de trabalho no container
WORKDIR /app

# Copiar arquivos do projeto
COPY package.json package-lock.json ./
COPY backend ./backend
COPY frontend ../frontend

# Instalar dependências do Node.js
RUN npm install

# Definir a porta usada pelo Render
ENV PORT=10000

# Expõe a porta correta
EXPOSE 10000

# Comando para iniciar o servidor
CMD ["node", "backend/server.js"]
