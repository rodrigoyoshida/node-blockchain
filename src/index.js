/**
 * Blockchain em Node.js
 * @author Rodrigo Yoshida
 **/
const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain.js');

const YoshidaCoin = new Blockchain();

const httpServer = function(myHttpPort) {
  const app = express();
  app.use(bodyParser.text());

  app.get('/blocks', function(req, res) {
    res.send(YoshidaCoin.chain);
  });

  app.post('/block', function(req, res) {
    const results = YoshidaCoin.addBlock(req.body);
    res.send(results);
  });

  app.get('/peers', function(req, res) {
    res.send(getSockets().map(
      function(s) {
        return s._socket.remoteAddress + ':' + s._socket.remotePort;
      }
    ));
  });

  app.post('/peer', function(req, res) {
    connectToPeers(req.body.peer);
    res.send();
  });

  app.listen(myHttpPort, function() {
    console.log('Serving API on: http://localhost:' + myHttpPort);
  });
}

httpServer(parseInt(process.env.HTTP_PORT) || 3001);
