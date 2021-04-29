pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";
import "./safemath.sol";

contract MemeFactory is Ownable{

    using SafeMath32 for uint32;
    using SafeMath for uint256;


    event NewMeme(uint memeId, string name, string caption,string ipfsHash);

    uint cooldownTime = 1 days;

    struct Meme {

        string name;
        string caption;
        string ipfsHash;
        uint32 readyTime;
    }

    Meme[] public memes;

    mapping (uint => address) public memeToOwner;     // id point to the address
    mapping (address => uint) ownerMemeCount;           // count how many memes the user have

    function createMeme(string memory _name, string memory _caption, string memory _ipfsHash) public{
        uint id = memes.push(Meme(_name, _caption, _ipfsHash, uint32( now + cooldownTime ))) - 1 ;
        memeToOwner[id] = msg.sender;
        ownerMemeCount[msg.sender] = ownerMemeCount[msg.sender].add(1);
        emit NewMeme(id, _name, _caption, _ipfsHash);
    }


    function setCooldownTime(uint _seconds) public onlyOwner {
        cooldownTime = _seconds;
    }

}
