const request = require('supertest');
const app = require('../app');
const pedidosService = require('./pedidosService');

describe('API de Gerenciamento de Pedidos - Testes Automatizados', () => {
  beforeEach(() => {
    pedidosService.resetDB();
  });

  test('POST /pedidos - Criar pedido válido deve retornar 201', async () => {
    const response = await request(app)
      .post('/pedidos')
      .send({
        cliente: "Carlos Silva",
        tipo: "entrega",
        valor: 350,
        prioridade: "normal"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.cliente).toBe("Carlos Silva");
    expect(response.body.status).toBe("recebido");
  });

  test('POST /pedidos - Criar pedido inválido deve retornar 400', async () => {
    const response = await request(app)
      .post('/pedidos')
      .send({
        cliente: "",
        tipo: "entrega",
        valor: -50,
        prioridade: "normal"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });

  test('GET /pedidos - Listar pedidos deve retornar 200', async () => {
    const response = await request(app).get('/pedidos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /pedidos/:id - Consulta id inexistente deve retornar 404', async () => {
    const response = await request(app).get('/pedidos/999');
    expect(response.statusCode).toBe(404);
  });

  test('PATCH /pedidos/:id/status - Atualização válida deve retornar 200', async () => {
    const novo = await request(app)
      .post('/pedidos')
      .send({
        cliente: "Ana Souza",
        tipo: "retirada",
        valor: 100,
        prioridade: "alta"
      });

    const response = await request(app)
      .patch(`/pedidos/${novo.body.id}/status`)
      .send({ status: "em_preparacao" });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("em_preparacao");
  });
});
