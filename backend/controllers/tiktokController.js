const { exec } = require('child_process');
const path = require('path');

exports.downloadVideo = (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).json({ error: "URL do vídeo é obrigatória!" });
    }

    console.log("Recebendo requisição para baixar do TikTok:", videoUrl);

    // Caminho para salvar o vídeo temporariamente
    const outputFilePath = path.join(__dirname, '../../downloads/tiktok_video.mp4');

    // Comando para baixar o vídeo diretamente
    const command = `/usr/local/bin/yt-dlp -f "bv*+ba/b" --merge-output-format mp4 -o "${outputFilePath}" ${videoUrl}`;
    console.log("Executando comando:", command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("Erro ao executar yt-dlp:", stderr);
            return res.status(500).json({ error: "Erro ao baixar o vídeo do TikTok" });
        }

        console.log("Download concluído, enviando arquivo ao usuário.");

        // Enviar o vídeo para o usuário
        res.download(outputFilePath, 'video.mp4', (err) => {
            if (err) {
                console.error("Erro ao enviar arquivo:", err);
                res.status(500).send("Erro ao baixar o vídeo.");
            }

            // Remover o arquivo temporário após o envio
            require('fs').unlink(outputFilePath, (err) => {
                if (err) console.error("Erro ao excluir arquivo:", err);
            });
        });
    });
};
