const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path'); // Agora o path está definido!

const app = express();
const port = 3000;

// Middleware de segurança para evitar bloqueios de CSS e JS externos
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'", "https://www.gstatic.com"],
            "style-src": ["'self'", "'unsafe-inline'", "https://www.gstatic.com"],
            "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.gstatic.com"],
            "script-src-attr": ["'unsafe-inline'"] // Permite eventos inline no HTML
        }
    }
}));


app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota principal para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Rotas do backend
const youtubeRoutes = require('./routes/youtube');
const instagramRoutes = require('./routes/instagram');
const tiktokRoutes = require('./routes/tiktok');

app.use('/youtube', youtubeRoutes);
app.use('/instagram', instagramRoutes);
app.use('/tiktok', tiktokRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
