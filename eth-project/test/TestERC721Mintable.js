var AqarERC721MintableToken = artifacts.require('AqarERC721MintableToken');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const totalSupply = 5;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await AqarERC721MintableToken.new({from: account_one});

            // TODO: mint multiple tokens
            for (var i = 0; i < totalSupply; i++) {
                await this.contract.mint(account_two, i, {from: account_one});
            }
        })

        it('should return total supply', async function () { 
            let testedTotalSupply = await this.contract.totalSupply.call();
            let expictedTotalSupply = totalSupply;

            assert.equal(testedTotalSupply, expictedTotalSupply)
        })

        it('should get token balance', async function () { 
            let expictedTokenBalance = totalSupply;
            let testedTokenBalance = await this.contract.balanceOf(account_two);

            assert.equal(testedTokenBalance, expictedTokenBalance);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let expictedTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1";
            let testedTokenURI = await this.contract.tokenURI(1);

            assert.equal(testedTokenURI, expictedTokenURI);
        })

        it('should transfer token from one owner to another', async function () { 
            let expectedTokenOwner = account_one
            await this.contract.transferFrom(account_two, expectedTokenOwner, (totalSupply-1), {from: account_two});
            let testedTokenOwner = await this.contract.ownerOf((totalSupply-1));

            assert.equal(testedTokenOwner, expectedTokenOwner);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await AqarERC721MintableToken.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(account_two, 1, {from: account_two});
            } catch(err) {
                assert.equal(err.reason, "only owner of contract can call this methods")
            }
        })

        it('should return contract owner', async function () { 
            let expictedContratOwner = account_one;
            let testedContractOwner = await this.contract.contractOwner();

            assert.equal(testedContractOwner, expictedContratOwner);
        })

    });
})