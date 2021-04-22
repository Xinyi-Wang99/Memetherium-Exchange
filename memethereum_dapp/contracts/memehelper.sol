pragma solidity >=0.5.0 <0.6.0;

import "./memeFactory.sol";


contract MemeHelper is MemeFactory {

    modifier onlyOwner() {
        require(isOwner());
        _;
    }

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

    function getMemesByOwner(address _owner) external view returns(uint[] memory) {
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
