pragma solidity >=0.5.0 <0.6.0;

import "./erc721.sol";
import "./safemath.sol";
import "./memehelper.sol";

/// TODO: Replace this with natspec descriptions
//contract ZombieOwnership is ZombieAttack, ERC721 {
contract MemeOwnership is  ERC721, MemeHelper{

    using SafeMath for uint256;

    mapping (uint => address) memeApprovals;

    function balanceOf(address _owner) external view returns (uint256) {
        return ownerMemeCount[_owner];
    }

    function ownerOf(uint _tokenId) external view returns (address) {
        return memeToOwner[_tokenId];
    }

    function _transfer(address _from, address _to, uint _tokenId) private {
        ownerMemeCount[_to] = ownerMemeCount[_to].add(1);
        ownerMemeCount[_from] = ownerMemeCount[_from].sub(1);
        memeToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint _tokenId) external payable {
        require (memeToOwner[_tokenId] == _from || memeApprovals[_tokenId] == _from);
        _transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint _tokenId) external payable onlyOwnerOf(_tokenId) {
        memeApprovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }

}
