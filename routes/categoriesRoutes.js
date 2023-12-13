const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriesController');

router.get('/:id', async (req, res) => {
    res.send(await controller.listarUM(req.params.id));
});

router.get('/:coluna?/:ordem?', async (req, res) => {
    res.send(await controller.listar(req.params.coluna, req.params.ordem));
});

router.post('/', (req, res) => {
    res.send(`Cria uma categoria: ${JSON.stringify(req.body)}`);
});

router.post('/:id', (req, res) => {
    res.send(`Edita uma categoria de id ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Deleta uma categoria de id ${req.params.id}`);
});

module.exports = router;