[![Udacity - Blockchain Developer Nanodegree](https://bit.ly/2svzNOI)](https://www.udacity.com/blockchain)

# AQAR Real Estate Exchange

AQAR Token is A Real Estate Exchange contract. 

## Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle)

To install, download or clone the repo, then:

`npm install`

In directory `eth-project/`  
`truffle compile`

## Tests
To run truffle tests:
In directory `eth-project/`

For all tests:    
`truffle test` 

For single file tests:  
`truffle test test/TestERC721Mintable.js`  
`truffle test test/TestSquareVerifier.js`  
`truffle test test/TestSolnSquareVerifier.js`  

## Addresses and Links 
OpenSea Marketplace Storefront link's: [Aqar Real Estate Exchange](https://rinkeby.opensea.io/category/aqarrealestateexchangev3)

### Token:
Contract address: [0x1b031B79727d8Dad0bc55D0d97082d47a5e94bEA](https://rinkeby.etherscan.io/address/0x1b031B79727d8Dad0bc55D0d97082d47a5e94bEA)   
Contract abi's: [/eth-project/build/contracts/SolnSquareVerifier.json](./eth-project/build/contracts/SolnSquareVerifier.json)
### Verifier:
Contract address: [0xC0eacA14c6D3dD8FED326eBcf99A0C557789EB3d](https://rinkeby.etherscan.io/address/0xC0eacA14c6D3dD8FED326eBcf99A0C557789EB3d)  
Contract abi's: [/eth-project/build/contracts/Verifier.json](./eth-project/build/contracts/Verifier.json)

## ZoKrates (generate zk-Snarks Validator)
#### Step 1: Run ZoKrates in Docker
``` 
docker run -v <path to your project folder>:/home/zokrates/code -ti zokrates/zokrates:0.3.0 /bin/bash
```

#### Change directory
``` 
cd code/zokrates/code/square/
``` 

#### Step 2: Compile the program written in ZoKrates DSL
``` 
~/zokrates compile -i square.code
``` 

#### Step 3: Generate the Trusted Setup
``` 
~/zokrates setup
```

#### Step 4: Compute Witness
``` 
~/zokrates compute-witness -a 3 9
```

#### Step 5: Generate Proof
```
~/zokrates generate-proof
```

#### Step 6: Export Verifier
```  
~/zokrates export-verifier
```

## Deploy to Rinkeby
Update <**your infura key**> in 
`/eth-project/truffle-config.js` before migrate to Rinkeby Network. 
And create a `.secret` file in `/eth-project/` with your mnemonic.

Start deployment
```
truffle migrate --network rinkeby
```

### Minting tokens Process
update <**your infura key**> and <**your mnemonic words**> in 
`/eth-project/scripts/secret.json` before start minting,    
In directory `/eth-project/scripts`, run:

#### Submit new solution for tokenId
```
node submit-sol.js <proof.json file location> <tokenId>
```
#### Mint new token for tokenId
```
node mint.js <tokenId>
```

## Token Metadata
Aqar metadata api project: [aqarnft-meadata](https://github.com/khalidfsh/aqarnft-metadata)
using this [startup code](https://github.com/ProjectOpenSea/metadata-api-nodejs)

## Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

## ZoKrates Improvements
squares as input to ZoKrates is not directly related to the real estate property use case. 
It is just meant to show how the process can be done programmatically. 
There might be other data that can be input to ZoKrates to verify land titles.
