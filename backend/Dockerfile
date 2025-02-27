# Usar uma imagem oficial do Node.js baseada no Debian Bullseye
FROM node:18-bullseye

# Definir ambiente como produção (otimiza o npm install)
ENV NODE_ENV=production

# Atualizar pacotes e instalar FFmpeg e yt-dlp em uma única camada
RUN apt-get update && apt-get install -y wget ffmpeg \
    && wget -O /usr/local/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Criar diretório de trabalho no container
WORKDIR /app

# Copiar apenas arquivos de dependências primeiro (para otimizar cache do Docker)
COPY package.json package-lock.json ./

# Instalar dependências antes de copiar o resto do projeto
RUN npm install --only=production

# Copiar o restante dos arquivos do projeto
COPY backend ./backend
COPY frontend ./frontend

# Definir variável de ambiente para a porta usada pelo Render
ENV PORT=10000

# Expõe a porta correta
EXPOSE 10000

# Comando para iniciar o servidor (pode ser sobrescrito no Render)
CMD ["npm", "start"]
