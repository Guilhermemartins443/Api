const pedidosService = require('../services/pedidosService');

exports.criarPedido = (req, res) => {
  try {
    const novoPedido = pedidosService.criar(req.body);
    return res.status(201).json(novoPedido);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

exports.listarPedidos = (req, res) => {
  try {
    const pedidos = pedidosService.listar();
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar pedidos." });
  }
};

exports.buscarPedidoPorId = (req, res) => {
  try {
    const { id } = req.params;
    const pedido = pedidosService.buscarPorId(id);
    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado." });
    }
    return res.status(200).json(pedido);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar pedido." });
  }
};

exports.atualizarStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ erro: "O campo status é obrigatório." });
    }

    const pedidoAtualizado = pedidosService.atualizarStatus(id, status);
    return res.status(200).json(pedidoAtualizado);
  } catch (error) {
    if (error.message === "Pedido não encontrado.") {
      return res.status(404).json({ erro: error.message });
    }
    return res.status(400).json({ erro: error.message });
  }
};
