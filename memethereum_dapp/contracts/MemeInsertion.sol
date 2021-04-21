pragma solidity >=0.5.0 <0.6.0;

contract MemeInsertion{
    string ipfsHash;

    function set(string memory x)public{
        ipfsHash = x;
    }

    function get()public view returns(string memory){
        return ipfsHash;
    }

}