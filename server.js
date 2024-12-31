import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import os from 'os';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket', 'polling']
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files
app.use(express.static('public'));

// Serve socket.io client library
app.use('/socket.io', express.static(join(__dirname, 'node_modules', 'socket.io', 'client-dist')));

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve mobile page
app.get('/mobile', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'mobile.html'));
});

// Serve server page
app.get('/server', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'server.html'));
});

// WebRTC signaling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate) => {
    socket.broadcast.emit('ice-candidate', candidate);
  });

  socket.on('broadcast', (message) => {
    io.emit('broadcast', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    socket.broadcast.emit('peer-disconnected');
  });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  const networkInterfaces = os.networkInterfaces();
  const addresses = [];

  Object.keys(networkInterfaces).forEach((interfaceName) => {
    const interfaces = networkInterfaces[interfaceName];
    interfaces?.forEach((interface_) => {
      if (interface_.family === 'IPv4' && !interface_.internal) {
        addresses.push(interface_.address);
      }
    });
  });

  console.log('\nServer running on:');
  addresses.forEach((address) => {
    console.log(`  http://${address}:${PORT}`);
  });
  console.log('\nAccess points:');
  console.log(`  Mobile page: http://<server-ip>:${PORT}/mobile`);
  console.log(`  Server page: http://<server-ip>:${PORT}/server`);
});