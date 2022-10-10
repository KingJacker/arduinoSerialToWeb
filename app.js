//const http = require('node:http');
const { fs, readFileSync } = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const arduino = '/dev/cu.usbmodem143101'

var index = readFileSync('index.html');

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const arduinoPort = new SerialPort({ path: arduino, baudRate: 9600 });

//const parsers = SerialPort.parsers;

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(index);
});
const io = new Server(httpServer,{

});


io.on("connection", (socket) => {
    console.log('node js is in!!!!!!!'); 
});


httpServer.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', (data) => {
    console.log(data);

    io.emit('data', data);
});