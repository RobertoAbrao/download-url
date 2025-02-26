function downloadVideo() {
    const videoUrl = document.getElementById("videoUrl").value;
    const platform = document.getElementById("platform").value;

    if (!videoUrl) {
        alert("Insira a URL do vídeo!");
        return;
    }

    const downloadLink = document.createElement("a");
    downloadLink.href = `http://localhost:3000/${platform}/download?url=${encodeURIComponent(videoUrl)}`;
    downloadLink.setAttribute("download", "video.mp4"); // Sugere um nome de arquivo
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
