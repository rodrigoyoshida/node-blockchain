const SHA256 = require('crypto-js/sha256');

/** Classe para criação de novos blocos */
class Block {
  constructor (index, data, previousHash, difficulty) {
    this.content = {};
    this.content.index = index;
    this.content.data = data;
    this.content.previousHash = previousHash;
    this.content.timestamp = Date.now();
    this.content.iterator = 0;
    this.difficulty = difficulty;
    this.calculateHash();
  }

  calculateHash() {
    this.hash = SHA256(JSON.stringify(this.content)).toString();
  }

  getHashInBinary() {
    let result = '';
    const lookupTable = {
        '0': '0000', '1': '0001', '2': '0010', '3': '0011', '4': '0100',
        '5': '0101', '6': '0110', '7': '0111', '8': '1000', '9': '1001',
        'a': '1010', 'b': '1011', 'c': '1100', 'd': '1101',
        'e': '1110', 'f': '1111'
    };
    for (let cnt = 0; cnt < this.hash.length; cnt++) {
      result += lookupTable[this.hash[cnt]];
    }
    return result;
  }

  // TODO: Tornar o processo de mineração assíncrono
  mine() {
    while (!this.satisfiedDifficulty()) {
      this.content.iterator++;
      this.calculateHash();
    }
    this.timestampAfterMining = Date.now();
    return true;
  }

  satisfiedDifficulty() {
    const requiredPrefix = '0'.repeat(this.difficulty);
    return this.getHashInBinary().startsWith(requiredPrefix);
  }

  hasValidStructure() {
    if (
         typeof this.content.index !== "number"
      || typeof this.content.data !== "string"
      || typeof this.content.previousHash !== "string"
      || typeof this.content.timestamp !== "number"
      || typeof this.content.iterator !== "number"
      || typeof this.difficulty !== "number"
      || typeof this.hash !== "string"
      || typeof this.timestampAfterMining !== "number"
      || this.content.data.length <= 0
    ) {
      return false;
    }
    return true;
  }

  isValid() {
    return this.satisfiedDifficulty() && this.hasValidStructure();
  }
}

module.exports = Block;
