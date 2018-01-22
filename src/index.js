/**
 * Algoritmo básico para criação de um Blockchain em Node.js
 * @author Rodrigo Yoshidas
 **/
const Blockchain = require('./blockchain.js');
const YoshidaCoin = new Blockchain();

YoshidaCoin.addBlock("Rodrigo Yoshida pagou 5 conto pro Ito");
YoshidaCoin.addBlock("Ito pagou 200 conto pro Yoshida");

if (YoshidaCoin.isChainValid()) {
  console.log(YoshidaCoin.chain);
} else {
  console.log('Blockchain inválido');
}
