const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Lista de reviews');
});

router.post('/', (req, res) => {
    res.send(`Cria uma review: ${JSON.stringify(req.body)}`);
});

router.post('/:id', (req, res) => {
    res.send(`Edita uma review de id ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Deleta uma review de id ${req.params.id}`);
});

module.exports = router;