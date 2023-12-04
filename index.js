const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const brandRoutes = require('./routes/brandRoutes');

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    response.send('Bem-vindo à API da Digital Store');
});

app.use('/marcas', brandRoutes);

app.listen(port, () => {
    console.log(`Servidor de pé na url: http://localhost:${port}`);
});