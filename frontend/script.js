document.getElementById("downloadButton").addEventListener("click", downloadVideo);

function downloadVideo() {
    const videoUrl = document.getElementById("videoUrl").value;
    const platform = document.getElementById("platform").value;
    const progressBar = document.querySelector(".progress");
    const progress = document.getElementById("progressBar");
    const downloadLinkDiv = document.getElementById("downloadLink");

    if (!videoUrl) {
        alert("Por favor, insira a URL do vídeo!");
        return;
    }

    // Exibir o indicador de progresso
    progressBar.style.display = "block";
    progress.style.width = "10%";
    progress.innerText = "Preparando...";

    fetch(`http://localhost:3000/${platform}/download?url=${encodeURIComponent(videoUrl)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao baixar o vídeo.");
            }

            // Atualizar barra de progresso
            progress.style.width = "50%";
            progress.innerText = "Baixando vídeo...";

            return response.blob();
        })
        .then(blob => {
            // Criar um link de download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "video.mp4";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Atualizar barra de progresso
            progress.style.width = "100%";
            progress.innerText = "Download concluído!";
            setTimeout(() => {
                progressBar.style.display = "none"; // Esconder barra de progresso
            }, 2000);

            // Exibir link alternativo
            downloadLinkDiv.innerHTML = `<a href="${url}" class="btn btn-success mt-2" target="_blank">Clique aqui se o download não começou</a>`;
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Ocorreu um erro ao baixar o vídeo.");
            progressBar.style.display = "none"; // Esconder barra de progresso em caso de erro
        });
}
