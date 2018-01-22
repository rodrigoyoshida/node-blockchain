const Block = require('./block.js');

/** Classe para manipulação do blockchain */
class Blockchain {
  constructor() {
    this.chain = [new Block(0 , null, 'Genesis block')];
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const latestBlock = this.getLatestBlock();
    const newBlock = new Block(
      this.chain.length,
      latestBlock.hash,
      data
    );
    if (this.isBlockValid(newBlock, latestBlock)) {
      this.chain.push(newBlock);
    }
  }

  isBlockValid(newBlock, previousBlock) {
    if (previousBlock.index + 1 !== newBlock.index) {
      console.log('Invalid index: ' + JSON.stringify(newBlock));
      return false;
    } else if (previousBlock.hash != newBlock.previousHash) {
      console.log('Invalid previous hash: ' + JSON.stringify(newBlock));
      return false;
    } else if (newBlock.calculateHash() !== newBlock.hash) {
      console.log('Invalid block hash: ' + JSON.stringify(newBlock));
      return false;
    } else if (!newBlock.isStructureValid()) {
      console.log('Invalid block structure: ' + JSON.stringify(newBlock));
      return false;
    }
    return true;
  }

  isChainValid() {
    for (let cnt = 1; cnt < this.chain.length; cnt++) {
      const currentBlock = this.chain[cnt];
      const previousBlock = this.chain[cnt - 1];

      if (!this.isBlockValid(currentBlock, previousBlock)) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;
