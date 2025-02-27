const { exec } = require('child_process');

exports.downloadVideo = (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).json({ error: "URL do vídeo é obrigatória!" });
    }

    console.log("Recebendo requisição para baixar:", videoUrl);

    // Comando para baixar o vídeo com cookies do navegador
    const command = `/usr/local/bin/yt-dlp --cookies-from-browser chrome -f "bv*+ba/b" --merge-output-format mp4 -g ${videoUrl}`;
    console.log("Executando comando:", command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("Erro ao executar yt-dlp:", stderr);
            return res.status(500).json({ error: "Erro ao obter o link do vídeo" });
        }

        const videoDirectUrl = stdout.trim();
        console.log("URL direta do vídeo:", videoDirectUrl);

        res.json({ downloadUrl: videoDirectUrl });
    });
};
