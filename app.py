import os
import yt_dlp
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DOWNLOAD_FOLDER = "videos"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

def download_video(url):
    ydl_opts = {
        'outtmpl': os.path.join(DOWNLOAD_FOLDER, '%(title)s.%(ext)s'),
        'format': 'best',
        'quiet': True,
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)
        return os.path.basename(filename)
    except Exception as e:
        return None

@app.route("/download", methods=["POST"])
def download():
    data = request.json
    url = data.get("url")
    if not url:
        return jsonify({"error": "URL é necessária"}), 400
    
    filename = download_video(url)
    if filename:
        return jsonify({"message": "Download concluído", "file": filename})
    else:
        return jsonify({"error": "Erro ao baixar o vídeo"}), 500

@app.route("/videos/<filename>")
def get_video(filename):
    return send_from_directory(DOWNLOAD_FOLDER, filename)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # Tente uma porta maior
    app.run(host="0.0.0.0", port=port)

