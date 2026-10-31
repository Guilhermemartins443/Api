const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.post('/', pedidosController.criarPedido);
router.get('/', pedidosController.listarPedidos);
router.get('/:id', pedidosController.buscarPedidoPorId);
router.patch('/:id/status', pedidosController.atualizarStatus);

module.exports = router;
