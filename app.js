const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, './dist/golden-treasure/browser')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', routes);

app.get('*', (req, res, next) => {
    const accept = req.headers.accept || '';
    if (accept.includes('text/html')) {
        res.sendFile(path.join(__dirname, './dist/golden-treasure/browser/index.html'));
    } else {
        next();
    }
});

const PORT = process.env.PORT || 8080;

app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});