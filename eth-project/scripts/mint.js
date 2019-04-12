const fs = require('fs');
const Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");

const contractFile = require('../build/contracts/SolnSquareVerifier');
const contractAddresses = require('../addresses.json');

//update hete 
const mnemonic = ""
const infuraKey = "";

var proofs = [require(`../../zokrates/code/square/proofs/main/proof.json`)];
for (var i = 1; i<10; i++) {
  proofs.push(require(`../../zokrates/code/square/proofs/${i}/proof.json`));
}

(async() => {
  const provider = await new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`, 1);
  const web3 = await new Web3(provider);
  const erc721Aqar = await new web3.eth.Contract(contractFile.abi, contractAddresses.erc721, { gasLimit: "5000000" });
  const accounts = await web3.eth.getAccounts()
  console.log(accounts);
  console.log((await erc721Aqar.methods.totalSupply().call()).toString());
 
  proofs.forEach(async (proof, i) => {
    let tokenId = i+1;
    try {
      await erc721Aqar.methods.submitSolution(
        ...Object.values(proof.proof), 
        proof.input,
        accounts[0],
        tokenId
      ).send({ from: accounts[0], gas: 2000000});
  
  
      await erc721Aqar.methods.mint(accounts[0], tokenId).send({ from: accounts[0], gas: 2000000});
      console.log(`tokenId: ${tokenId} minted for address ${accounts[0]}`)
    } catch(e) {
      console.log(e);
    }
    
  });
})();