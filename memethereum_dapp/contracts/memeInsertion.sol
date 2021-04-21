pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";
import "./safemath.sol";



contract MemeFactory is Ownable {

    event NewMeme(uint memeId, string name, string caption,string ipfsHash);

    struct Meme {
        string name;
        string caption;
        string ipfsHash;
        uint32 readyTime;
    }

    Meme[] public memes;

    mapping (string => address) public memeToOwner;     // ipfsHash point to the address
    mapping (address => uint) ownerMemeCount;           // count how many memes the user have

    function _createMeme(string memory _name, string memory _caption, string memory _ipfsHash){
        uint id = memes.push(Meme(_name, _caption, _ipfsHash, uint32(now+cooldownTime)) - 1;
        memeToOwner[id] = msg.sender;
        ownerMemeCount[msg.sender] = ownerMemeCount[msg.sender].add(1);
        emit NewMeme(id, _name, _caption, _ipfsHash);
    }


    function setCooldownTime(uint _seconds) public onlyOwner {
        cooldownTime = _seconds;
    }


}
