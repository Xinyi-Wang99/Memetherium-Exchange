pragma solidity >=0.5.0 <0.6.0;

import "./memeFactory.sol";


contract MemeHelper is MemeFactory {

//    uint levelUpFee = 0.001 ether;
//
//    modifier aboveLevel(uint _level, uint _zombieId) {
//        require(zombies[_zombieId].level >= _level);
//        _;
//    }

    /* function withdraw() external onlyOwner {
        address payable _owner = address(uint160(owner));
        _owner.transfer(address(this).balance);
    }
*/
//    function setLevelUpFee(uint _fee) external onlyOwner {
//        levelUpFee = _fee;
//    }
//
//    function levelUp(uint _zombieId) external payable {
//        require(msg.value == levelUpFee);
//        zombies[_zombieId].level = zombies[_zombieId].level.add(1);
//    }

    modifier onlyOwnerOf(uint _memeId) {
        require(msg.sender == memeToOwner[_memeId]);
        _;
    }

    function changeName(uint _memeId, string calldata _newName) external onlyOwnerOf(_memeId) {
        memes[_memeId].name = _newName;
    }

    function changeCaption(uint _memeId, string calldata _caption) external  onlyOwnerOf(_memeId) {
        memes[_memeId].caption = _caption;
    }

    function getZMemesByOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerMemeCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < memes.length; i++) {
            if (memeToOwner[i] == _owner) {
            result[counter] = i;
            counter++;
            }
        }
    return result;
    }

    function withdraw() external onlyOwner {
        address payable _owner = address(uint160(owner()));
        _owner.transfer(address(this).balance);
    }

}
