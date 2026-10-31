let pedidosDB = [];
let proximoId = 1;

const TIPOS_VALIDOS = ['entrega', 'retirada', 'balcao'];
const PRIORIDADES_VALIDAS = ['baixa', 'normal', 'alta', 'urgente'];
const STATUS_VALIDOS = ['recebido', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];

class PedidosService {
  criar(dados) {
    const { cliente, tipo, valor, prioridade } = dados;

    // Validação de cliente
    if (!cliente || typeof cliente !== 'string' || cliente.trim() === '') {
      throw new Error("O campo 'cliente' é obrigatório e não pode ser vazio.");
    }

    // Validação de valor
    if (valor === undefined || typeof valor !== 'number' || valor <= 0) {
      throw new Error("O campo 'valor' deve ser um número maior que zero.");
    }

    // Validação de tipo
    if (!tipo || !TIPOS_VALIDOS.includes(tipo.toLowerCase())) {
      throw new Error(`O campo 'tipo' deve ser um dos seguintes: ${TIPOS_VALIDOS.join(', ')}.`);
    }

    // Validação de prioridade
    if (!prioridade || !PRIORIDADES_VALIDAS.includes(prioridade.toLowerCase())) {
      throw new Error(`O campo 'prioridade' deve ser um dos seguintes: ${PRIORIDADES_VALIDAS.join(', ')}.`);
    }

    const novoPedido = {
      id: proximoId++,
      cliente: cliente.trim(),
      tipo: tipo.toLowerCase(),
      valor,
      prioridade: prioridade.toLowerCase(),
      status: 'recebido'
    };

    pedidosDB.push(novoPedido);
    return novoPedido;
  }

  listar() {
    return pedidosDB;
  }

  buscarPorId(id) {
    const numId = parseInt(id, 10);
    return pedidosDB.find(p => p.id === numId) || null;
  }

  atualizarStatus(id, novoStatus) {
    const pedido = this.buscarPorId(id);
    if (!pedido) {
      throw new Error("Pedido não encontrado.");
    }

    const statusFormatado = novoStatus.toLowerCase();

    if (!STATUS_VALIDOS.includes(statusFormatado)) {
      throw new Error(`Status inválido. Escolha um dos seguintes: ${STATUS_VALIDOS.join(', ')}.`);
    }

    if (pedido.status === 'entregue' || pedido.status === 'cancelado') {
      throw new Error(`Não é possível alterar o status de um pedido com status '${pedido.status}'.`);
    }

    pedido.status = statusFormatado;
    return pedido;
  }

  // Método auxiliar para testes
  resetDB() {
    pedidosDB = [];
    proximoId = 1;
  }
}

module.exports = new PedidosService();
