
import MemetheriumContract from "../contract_ABI/Memetherium.sol/Memetherium.json";
import { ethers } from "ethers";

const initBlockchain = async () => {

    let provider;
    window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));

    const signer = await provider.getSigner()
    console.log("READ ABI", MemetheriumContract.abi);

    console.log("signer", signer);
    const userAddress =  await signer.getAddress();
    console.log("user address", userAddress);

    let MEME = null;
    console.log(MemetheriumContract);
    const MEMEabi = MemetheriumContract.abi;
    MEME = new ethers.Contract('0x968263088fA47F49f1a66612cA65E7a27Fa89094', MEMEabi, signer);//new ethers.Contract('0x74D7EE64E10E877ce1aAdfbA458b3F7ec583Fa1E', MEMEabi, signer);
    console.log("MEME init", MEME)
    let userMemeCount = +(await MEME.balanceOf(userAddress));

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

    let data = {
        MEME,
        signer,
        userAddress,
        userMemeCount,
        totalMemeCount: Math.max(low-1,1)
    };

    return data;

}

export default initBlockchain;
