// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('Um cliente se conectou');

    // Evento para receber mudanças na caixa de texto
    socket.on('textoAlterado', (texto) => {
        // Envia o novo texto para todos os clientes conectados
        io.emit('atualizarTexto', texto);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
