import os
import yt_dlp
import tkinter as tk
from tkinter import messagebox
from threading import Thread

def download_video():
    url = url_entry.get()
    if not url:
        messagebox.showerror("Erro", "Por favor, insira uma URL válida.")
        return
    
    save_path = os.path.join(os.getcwd(), "videos")
    os.makedirs(save_path, exist_ok=True)
    
    ydl_opts = {
        'outtmpl': os.path.join(save_path, '%(title)s.%(ext)s'),
        'format': 'best',
        'quiet': True,
    }
    
    def run_download():
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])
            messagebox.showinfo("Sucesso", "Download concluído!")
        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao baixar o vídeo: {str(e)}")
    
    Thread(target=run_download).start()

# Criando a interface gráfica
root = tk.Tk()
root.title("Downloader de Vídeos")
root.geometry("400x200")

tk.Label(root, text="Insira a URL do vídeo:").pack(pady=5)
url_entry = tk.Entry(root, width=50)
url_entry.pack(pady=5)

download_button = tk.Button(root, text="Baixar Vídeo", command=download_video)
download_button.pack(pady=20)

root.mainloop()
