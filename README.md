# AQAR Real Estate Exchange

AQAR Real Estate Exchange is the capstone project for Udacity's Blockchain course. 

## Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle)

To install, download or clone the repo, then:

`npm install`

In directory `eth-contracts/`  
`truffle compile`

## Tests
To run truffle tests:
In directory `eth-contracts/`

For all tests:    
`truffle test` 

For single file tests:  
`truffle test test/TestERC721Mintable.js`  
`truffle test test/TestSquareVerifier.js`  
`truffle test test/TestSolnSquareVerifier.js`  

## Addresses and Links 
Contract address (Token) : [0xD2813cb5680111A8Eb5650e7d468Be16C4021a84](https://rinkeby.etherscan.io/address/0xd2813cb5680111a8eb5650e7d468be16c4021a84)  
Contract address (Verifier): [0x5b1a9A39B9eF0B623AE45B210c1630dE93122997](https://rinkeby.etherscan.io/address/0x5b1a9A39B9eF0B623AE45B210c1630dE93122997)  
OpenSea Marketplace Storefront link's: [Aqar Real Estate Exchange](https://rinkeby.opensea.io/category/aqarrealestateexchangev2)

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
../../../../zokrates compile -i square.code
``` 

#### Step 3: Generate the Trusted Setup
``` 
../../../../zokrates setup
```

#### Step 4: Compute Witness
``` 
../../../../zokrates compute-witness -a 3 9
```

#### Step 5: Generate Proof
```
../../../../zokrates generate-proof
```

#### Step 6: Export Verifier
```  
../../../../zokrates export-verifier
```

# Deploy to Rinkeby
Update <**your infura key**> in 
`/eth-contracts/truffle-config.js` before migrate to Rinkeby Network. 
And create a `.secret` file in `/eth-contracts/` with your mnemonic.

Example `.secret` content:
```
make soup average fence better canvas house like mystery happy holiday
``` 
 
Start deployment
```
truffle migrate --network rinkeby
```

#Minting tokens
Update <**your infura key**> and <**your mnemonic words**> in 
`/eth-contracts/scrippts/mint.js` before start minting 
```
node scripts/mint.js
```

#Token Metadata
Aqar metadata api project: [aqarnft-meadata](https://github.com/khalidfsh/aqarnft-metadata)
using this [startup code](https://github.com/ProjectOpenSea/metadata-api-nodejs)
# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

# Known Bugs / Improvements
squares as input to ZoKrates is not directly related to the real estate property use case. 
It is just meant to show how the process can be done programmatically. 
There might be other data that can be input to ZoKrates to verify land titles.