const SHA256 = require('crypto-js/sha256');

/** Classe para criação de novos blocos */
class Block {
  constructor (index, previousHash, data) {
    this.index = index;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = Date.now();
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
        this.index
      + this.previousHash
      + this.data
      + this.timestamp
    ).toString();
  }

  isStructureValid() {
    if (
      typeof this.index !== "number"
      || typeof this.timestamp !== "number"
      || typeof this.data !== "string"
      || typeof this.previousHash !== "string"
      || typeof this.hash !== "string"
    ) {
      return false;
    }
    return true;
  }
}

module.exports = Block;
