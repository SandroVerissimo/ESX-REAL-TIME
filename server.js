// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Define o diretório de arquivos estáticos
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Quando um cliente se conecta, loga no console
io.on('connection', (socket) => {
    console.log('Um cliente se conectou');

    // Quando o cliente envia um novo texto, transmita para todos os clientes
    socket.on('textoAlterado', (texto) => {
        io.emit('atualizarTexto', texto);
    });

    // Quando o cliente se desconecta, loga no console
    socket.on('disconnect', () => {
        console.log('Um cliente se desconectou');
    });
});

// Inicia o servidor na porta 80 (HTTP) ou na porta que seu provedor de hospedagem requer
const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
