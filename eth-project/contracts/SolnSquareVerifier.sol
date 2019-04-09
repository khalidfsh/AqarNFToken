pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./SquareVerifier.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is AqarERC721MintableToken {



// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 tokenId;
        address owner;
        uint256[2] input;
        bool isMinted;
    }

    Verifier verifier;

// TODO define an array of the above struct
    mapping(bytes32 => Solution) solutions;

// TODO define a mapping to store unique solutions submitted
    mapping(uint256 => bytes32) private solutionsKeys;


// TODO Create an event to emit when a solution is added
    event SolutionAdded(address indexed to, uint256 indexed TokenId);

    constructor(address verifierAddress) public {
        verifier = Verifier(verifierAddress);
    }

// TODO Create a function to add the solutions to the array and emit the event
    function submitSolution
    (
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input,
        address account,
        uint256 tokenId
    ) 
        public 
    {
        require(solutionsKeys[tokenId] == bytes32(0), "tokenId: has solution");
        require(verifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "incorrect proof input");
        bytes32 solutionKey = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));

        solutionsKeys[tokenId] = solutionKey;
        solutions[solutionKey].owner = account;
        solutions[solutionKey].tokenId = tokenId;
        solutions[solutionKey].input = input;

        emit SolutionAdded(account, tokenId);
    }


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function mint(address to, uint256 tokenId) public returns(bool) {
        bytes32 solutionKey = solutionsKeys[tokenId];
        require(solutionKey != bytes32(0), "no solution found for tokenId");
        require(!solutions[solutionKey].isMinted, "tokenId: allready mined");

        address orginalOwner = solutions[solutionsKeys[tokenId]].owner;
        require(orginalOwner == to, "orginal owner of token solution is not address given");

        solutions[solutionKey].isMinted = true;
        return super.mint(to, tokenId);
    }

    function mintBySolOwner(uint256 tokenId) public returns(bool) {
        bytes32 solutionKey = solutionsKeys[tokenId];
        require(solutionKey != bytes32(0), "no solution found for tokenId");
        require(!solutions[solutionKey].isMinted, "tokenId: allready mined");

        address orginalOwner = solutions[solutionsKeys[tokenId]].owner;
        require(orginalOwner == msg.sender, "orginal owner of token solution is not caller address");

        solutions[solutionKey].isMinted = true;
        super._mint(orginalOwner, tokenId);
        super._setTokenURI(tokenId);
        return true;
    }
}
