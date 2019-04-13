var SolnSquareVerifier = artifacts.require('./SolnSquareVerifier.sol');
var Verifier = artifacts.require('Verifier');
const ZokratesProof = require("../../zokrates/code/square/proofs/main/proof.json");


contract("SolnSquareVerifier", accounts => {
    const deployerAccount = accounts[0];
    const token = {
        id: '1',
        owner: accounts[1],
    };

    beforeEach(async() => {
        let verifierContract = await Verifier.new({from: deployerAccount});
        this.contract = await SolnSquareVerifier.new(verifierContract.address, {from: deployerAccount});
    });

// Test if a new solution can be added for contract - SolnSquareVerifier
    it("new solution can be added", async() => {
        let success = false;

        try {
            await this.contract.submitSolution(
                ...Object.values(ZokratesProof.proof), 
                ZokratesProof.input,
                token.owner,
                token.id,
                { from: token.owner }
            );
            
            success = true;
        } catch(e) {
            success = false
            console.log(e)
        }

        assert(success)
    });

    it("new solution cannot be added if the proof was used previously", async() => {
        let success = false;

        try {
            await this.contract.submitSolution(
                ...Object.values(ZokratesProof.proof), 
                ZokratesProof.input,
                token.owner,
                token.id,
                { from: token.owner }
            );

            await this.contract.submitSolution(
                ...Object.values(ZokratesProof.proof), 
                ZokratesProof.input,
                token.owner,
                2,
                { from: token.owner }
            );
            
            success = true;
        } catch(e) {
            success = false
        }

        assert(!success)
    });

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it("new ERC721 token can be minted after solution submition by contract owner", async() => {
        let success = false;
        try {
            await this.contract.submitSolution(
                ...Object.values(ZokratesProof.proof), 
                ZokratesProof.input,
                token.owner,
                token.id,
                { from: token.owner }
            );

            await this.contract.mint(token.owner, token.id, { from: deployerAccount });

            success = true
        } catch(e) {
            success = false
            console.log(e)
        }

        assert(success, "adding new token proccess did not pass, see `submitSolution` & `mint`")

        let expectedTokenOwner = token.owner
        let testedTokenOwner = await this.contract.ownerOf((token.id));
        assert.equal(testedTokenOwner, expectedTokenOwner, "token prover after submissions do not own his token!");
    })

    it("new ERC721 token can be minted after solution submition by solution owner", async() => {
        let success = false;
        try {
            await this.contract.submitSolution(
                ...Object.values(ZokratesProof.proof), 
                ZokratesProof.input,
                token.owner,
                token.id,
                { from: token.owner }
            );

            await this.contract.mintBySolOwner(token.id, { from: token.owner });

            success = true
        } catch(e) {
            success = false
            console.log(e)
        }

        assert(success, "adding new token proccess did not pass, see `submitSolution` & `mint`")

        let expectedTokenOwner = token.owner
        let testedTokenOwner = await this.contract.ownerOf((token.id));
        assert.equal(testedTokenOwner, expectedTokenOwner, "token prover after submissions do not own his token!");
    })

})

