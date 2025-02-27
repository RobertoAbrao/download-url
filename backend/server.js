const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware de segurança - Configurando Content Security Policy (CSP)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'", "https://cdn.jsdelivr.net"],
            "style-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
            "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net"],
            "font-src": ["'self'", "https://cdn.jsdelivr.net"],
            "img-src": ["'self'", "data:", "https://cdn.jsdelivr.net"],
        }
    }
}));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas do backend
const youtubeRoutes = require('./routes/youtube');
const instagramRoutes = require('./routes/instagram');
const tiktokRoutes = require('./routes/tiktok');

app.use('/youtube', youtubeRoutes);
app.use('/instagram', instagramRoutes);
app.use('/tiktok', tiktokRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
