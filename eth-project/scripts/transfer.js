const Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");

const contractFile = require('../build/contracts/SolnSquareVerifier');
const contractAddresses = require('../addresses.json');
const secret = require("./secret.json");

const argv = process.argv.slice(2);
const tokenId = argv[0];
const to = argv[1];

(async() => {
  const provider = await new HDWalletProvider(secret.mnemonic, `https://rinkeby.infura.io/v3/${secret.infuraKey}`, 1);
  const web3 = await new Web3(provider);
  const erc721Aqar = await new web3.eth.Contract(contractFile.abi, contractAddresses.erc721, { gasLimit: "3000000" });
  const accounts = await web3.eth.getAccounts();

  console.log(`contract currently has ${(await erc721Aqar.methods.totalSupply().call()).toString()} tokens`);
  console.log(`minting new token with tokenId: ${tokenId} from address ${accounts[0]}`);
  try {
    let tx = await erc721Aqar.methods.transferFrom(accounts[0], to, tokenId).send({ from: accounts[0], gas: 2500000});
    console.log(tx)
  } catch(err) {
    throw err
  } 

  process.exit(1);
  process.kill(process.pid);
})();

