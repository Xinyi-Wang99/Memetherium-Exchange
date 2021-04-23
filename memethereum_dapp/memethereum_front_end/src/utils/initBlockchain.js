
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
    MEME = new ethers.Contract('0x74D7EE64E10E877ce1aAdfbA458b3F7ec583Fa1E', MEMEabi, signer);
    let data = {
        MEME,
        signer,
        userAddress,
    };

    return data;

}

export default initBlockchain;
