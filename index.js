/**
 * Algoritmo básico para criação de um Blockchain em Javascript
 * @author Rodrigo Yoshida
 **/

const SHA256 = require('crypto-js/sha256');

/** Classe para criação de novos blocos */
class Block {
  constructor (index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
        this.index
      + this.timestamp
      + JSON.stringify(this.data)
      + this.previousHash
    ).toString();
  }
}

 /** Classe para manipulação do blockchain */
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2018', 'Genesis block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let cnt = 1; cnt < this.chain.length; cnt++) {
      const currentBlock = this.chain[cnt];
      const previousBlock = this.chain[cnt - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

/** Cria e manipula o blockchain */
let YoshidaCoin = new Blockchain();

YoshidaCoin.addBlock(
  new Block(
    1,
    "16/01/2018",
    {qty: 5}
  )
);

YoshidaCoin.addBlock(
  new Block(
    1,
    "18/01/2018",
    {qty: 2}
  )
);

/** Checa e exibe o blockchain */
if (YoshidaCoin.isChainValid()) {
  console.log(YoshidaCoin.chain);
} else {
  console.log('Blockchain inválido');
}
