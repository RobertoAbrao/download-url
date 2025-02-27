const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.downloadVideo = (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).json({ error: "URL do vídeo é obrigatória!" });
    }

    console.log("Recebendo requisição para baixar do Instagram:", videoUrl);

    // Caminho para salvar o vídeo temporariamente (agora com nome dinâmico)
    const outputFilePath = path.join(__dirname, '../../downloads/instagram_%(id)s.%(ext)s');

    // Caminho do arquivo de cookies
    const cookieFilePath = path.join(__dirname, '/tmp/instagram_cookies.txt');

    // Comando para baixar o vídeo com cookies
    const command = `/usr/local/bin/yt-dlp --cookies "${cookieFilePath}" -f "bv*+ba/b" --merge-output-format mp4 -o "${outputFilePath}" ${videoUrl}`;
    console.log("Executando comando:", command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("Erro ao executar yt-dlp:", stderr);
            return res.status(500).json({ error: "Erro ao baixar o vídeo do Instagram" });
        }

        console.log("Download concluído.");

        // Descobrir qual arquivo foi salvo
        fs.readdir(path.join(__dirname, '../../downloads/'), (err, files) => {
            if (err) {
                console.error("Erro ao ler pasta de downloads:", err);
                return res.status(500).json({ error: "Erro ao processar o download." });
            }

            // Filtrar pelo padrão instagram_
            const downloadedFile = files.find(file => file.startsWith("instagram_") && file.endsWith(".mp4"));
            if (!downloadedFile) {
                return res.status(500).json({ error: "Arquivo de vídeo não encontrado." });
            }

            const finalFilePath = path.join(__dirname, '../../downloads/', downloadedFile);
            console.log("Enviando arquivo:", finalFilePath);

            // Enviar o vídeo para o usuário
            res.download(finalFilePath, 'video.mp4', (err) => {
                if (err) {
                    console.error("Erro ao enviar arquivo:", err);
                    res.status(500).send("Erro ao baixar o vídeo.");
                }

                // Remover o arquivo temporário após o envio
                fs.unlink(finalFilePath, (err) => {
                    if (err) console.error("Erro ao excluir arquivo:", err);
                });
            });
        });
    });
};
