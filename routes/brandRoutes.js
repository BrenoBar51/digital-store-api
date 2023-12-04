const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Lista de marcas');
});

router.post('/', (req, res) => {
    res.send(`Cria uma marca: ${JSON.stringify(req.body)}`);
});

router.post('/:id', (req, res) => {
    res.send(`Edita uma marca de id ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Deleta uma marca de id ${req.params.id}`);
});

module.exports = router;