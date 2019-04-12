// migrating the appropriate contracts
var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const fs = require('fs');

module.exports = async function(deployer) {
  await deployer.deploy(Verifier);
  const verifierContract = await Verifier.deployed();

  await deployer.deploy(SolnSquareVerifier, verifierContract.address);
  const erc721Contract = await SolnSquareVerifier.deployed();

  let addresses = {
    verifier: verifierContract.address,
    erc721: erc721Contract.address
  }

  fs.writeFileSync(__dirname + '/../addresses.json',JSON.stringify(addresses, null, '\t'), 'utf-8');

};
