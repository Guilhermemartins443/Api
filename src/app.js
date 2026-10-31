const express = require('express');
const pedidosRoutes = require('./routes/pedidosRoutes');

const app = express();

app.use(express.json());

// Rota principal de pedidos
app.use('/pedidos', pedidosRoutes);

// Rota base de verificação
app.get('/', (req, res) => {
  res.json({ message: "API de Gerenciamento de Pedidos - Guilherme Martins de Almeida RGM 45787115" });
});

// Middleware global de tratamento de erros unexpected (HTTP 500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: "Erro interno no servidor." });
});

module.exports = app;
