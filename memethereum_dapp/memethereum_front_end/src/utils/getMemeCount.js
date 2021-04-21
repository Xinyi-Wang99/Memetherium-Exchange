import store from "../redux/store";

export const MEME_COUNT = "MEME_COUNT"; // action type

// action creator (dispatch sends this to redux reducer)
function memeCount(data) {
  return {
    type: MEME_COUNT,
    payload: data
  };
}

//
//  set up the blockchain shadow contract, user address, and user zombie count.  Put into redux store.
//

async function getMemeCount(MEME, userAddress) {
  // get number of zombies owned by the user account
  let userMemeCount = +(await MEME.balanceOf(userAddress));  // + convert a string to an integer

  // do a binary search to estimate total zombie count.
  // It is a real shame that the Cryptozombies contract doesn't totally comply with ERC720 to include a function
  // that returns totalZombieount.

  var high = 8192;
  var low = 0;
  var middle = 4096;

  while (low < high) {
      try {
      await MEME.memes(middle);
      low = middle + 1;
      middle = Math.floor(low + (high - low) / 2);
    } catch {
      high = middle - 1;
      middle = Math.floor(low + (high - low) / 2);
    }
  }

  // put state data into the REDUX store for easy access from other pages and components

  let data = {
    totalMemeCount: Math.max(low-1, 1),   // from binary search
    userMemeCount          //EC7 shorthand for totalZombieCount:totalZombieCount because of same variable name
  };

  store.dispatch(memeCount(data));
}

export default getMemeCount;