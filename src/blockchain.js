const Block = require('./block.js');

/** Classe para manipulação do blockchain */
class Blockchain {
  constructor() {
    this.expectedMiningTime = 1000;
    this.adjustDifficultyEvery = 3;

    this.genesisBlock = new Block(0 , 'Genesis block', '', 10);
    this.genesisBlock.mine();
    this.chain = [this.genesisBlock];
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  getUpdatedDifficulty() {
    const latestBlock = this.getLatestBlock();
    const nextIndex = latestBlock.content.index + 1;

    if (nextIndex % this.adjustDifficultyEvery === 0) {
      let
        timeExpected = this.adjustDifficultyEvery * this.expectedMiningTime,
        timeTaken = 0;
      const
        tolerance = timeExpected / 2;

      for (
        let cnt = this.chain.length - this.adjustDifficultyEvery;
        cnt < this.chain.length ;
        cnt++
      ) {
        timeTaken += this.chain[cnt].timestampAfterMining - this.chain[cnt].content.timestamp;
      }

      if (timeTaken < timeExpected - tolerance) {
        return latestBlock.difficulty + 1;
      } else if (timeTaken > timeExpected + tolerance) {
        return latestBlock.difficulty - 1;
      }
      return latestBlock.difficulty;
    } else {
      return latestBlock.difficulty;
    }
  }

  addBlock(data) {
    const latestBlock = this.getLatestBlock();
    const newBlock = new Block(
      this.chain.length,
      data,
      latestBlock.hash,
      this.getUpdatedDifficulty()
    );

    if (!newBlock.mine() || !this.isBlockValid(newBlock)) {
      return "Invalid block";
    }
    this.chain.push(newBlock);
    return newBlock;
  }

  isBlockValid(newBlock, previousBlock) {
    const prevBlock = previousBlock ? previousBlock : this.getLatestBlock();
    if (
      prevBlock.content.index + 1 !== newBlock.content.index
      || prevBlock.hash != newBlock.content.previousHash
    ) {
      return false;
    }
    return true;
  }

  isChainValid(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(this.genesisBlock)) {
      return false;
    }

    for (let cnt = 1; cnt < chain.length; cnt++) {
      const currentBlock = chain[cnt];
      const previousBlock = chain[cnt - 1];

      if (!this.isBlockValid(currentBlock, previousBlock)) {
        return false;
      }
    }

    return true;
  }

  replaceChain(newChain) {
    if (isChainValid(newChain) && newChain.length > this.chain.length) {
      this.chain = newChain;
      this.broadcastLatest();
    } else {
      console.log('Received invalid blockchain');
    }
  }
}

module.exports = Blockchain;
