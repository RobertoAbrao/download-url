const { exec } = require('child_process');
const request = require('request');

exports.downloadVideo = (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).json({ error: "URL do vídeo é obrigatória!" });
    }

    console.log("Recebendo requisição para baixar:", videoUrl);

    const command = `"C:\\Users\\beto-\\OneDrive\\Desktop\\PROJETO DOWNLOAD YOUTUBE\\backend\\yt-dlp.exe" -g ${videoUrl}`;
    console.log("Executando comando:", command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("Erro ao executar yt-dlp:", stderr);
            return res.status(500).json({ error: "Erro ao obter o link do vídeo" });
        }

        const videoDirectUrl = stdout.trim();
        console.log("URL direta do vídeo:", videoDirectUrl);

        // Força o navegador a baixar o vídeo
        res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
        res.setHeader("Content-Type", "video/mp4");

        request(videoDirectUrl).pipe(res);
    });
};
