// migrating the appropriate contracts
var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Verifier);
  const verifierContract = await Verifier.deployed();

  await deployer.deploy(SolnSquareVerifier, verifierContract.address);
};
