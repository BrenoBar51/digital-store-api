const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Lista de usuarios');
});

router.post('/', (req, res) => {
    res.send(`Cria uma usuario: ${JSON.stringify(req.body)}`);
});

router.post('/:id', (req, res) => {
    res.send(`Edita uma usuario de id ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Deleta uma usuario de id ${req.params.id}`);
});

module.exports = router;