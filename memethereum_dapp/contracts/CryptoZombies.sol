pragma solidity >=0.5.0 <0.6.0;

import "./zombieownership.sol";
import "./MemeInsertion.sol";

contract CryptoZombies is ZombieOwnership, MemeInsertion
{
    string ipfsHash;

    function set(string memory x)public{
        ipfsHash = x;
    }

    function get()public view returns(string memory){
        return ipfsHash;
    }

}