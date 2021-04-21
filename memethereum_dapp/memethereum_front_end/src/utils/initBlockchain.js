import CryptoZombiesContract from "../contract_ABI/CryptoZombies.sol/CryptoZombies.json";
import store from "../redux/store";
import { ethers } from "ethers";

export const BLOCKCHAIN_INITIALIZED = "BLOCKCHAIN_INITIALIZED"; // action type

// action creators (dispatch sends this to redux reducer)

function blockchainInitialized(data) {
    return {
        type: BLOCKCHAIN_INITIALIZED,
        payload: data
    };
}


//  set up provider, signer and contract instance

const initBlockchain = async () => {

    // get contract instance and user address
    // If you don't specify a //url//, Ethers connects to the default
    // (i.e. ``http:/\/localhost:8545``)

    // I used this to connect to Ganache:

    //const provider = await new ethers.providers.JsonRpcProvider();
    //console.log("provider", provider);

    let provider;
    window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));

    // The provider also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...

    const signer = await provider.getSigner()
    console.log("signer", signer);
    const userAddress =  await signer.getAddress();
    console.log("user address", userAddress);

    // initialize shadow contract

    let CZ = null;
    console.log("READ ABI");
    console.log(CryptoZombiesContract);
    const abi = JSON.parse(JSON.stringify([
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_approved",
                    "type": "address"
                },
                {
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_zombieId",
                    "type": "uint256"
                }
            ],
            "name": "levelUp",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_zombieId",
                    "type": "uint256"
                },
                {
                    "name": "_kittyId",
                    "type": "uint256"
                }
            ],
            "name": "feedOnKitty",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "zombies",
            "outputs": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "dna",
                    "type": "uint256"
                },
                {
                    "name": "level",
                    "type": "uint32"
                },
                {
                    "name": "readyTime",
                    "type": "uint32"
                },
                {
                    "name": "winCount",
                    "type": "uint16"
                },
                {
                    "name": "lossCount",
                    "type": "uint16"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "getZombiesByOwner",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "x",
                    "type": "string"
                }
            ],
            "name": "set",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "zombieToOwner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "setKittyContractAddress",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_zombieId",
                    "type": "uint256"
                },
                {
                    "name": "_newDna",
                    "type": "uint256"
                }
            ],
            "name": "changeDna",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "get",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_seconds",
                    "type": "uint256"
                }
            ],
            "name": "setCooldownTime",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "createRandomZombie",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "isOwner",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_zombieId",
                    "type": "uint256"
                },
                {
                    "name": "_newName",
                    "type": "string"
                }
            ],
            "name": "changeName",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_fee",
                    "type": "uint256"
                }
            ],
            "name": "setLevelUpFee",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_zombieId",
                    "type": "uint256"
                },
                {
                    "name": "_targetId",
                    "type": "uint256"
                }
            ],
            "name": "attack",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "zombieId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "dna",
                    "type": "uint256"
                }
            ],
            "name": "NewZombie",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        }
    ]))
    // const abi = JSON.parse(CryptoZombiesContract.abi);
    // console.log("This is abi", abi)
    // const abi = JSON.parse("[\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_approved\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"_tokenId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"approve\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": true,\n" +
    //     "      \"stateMutability\": \"payable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_zombieId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"levelUp\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": true,\n" +
    //     "      \"stateMutability\": \"payable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_zombieId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"_kittyId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"feedOnKitty\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": true,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"zombies\",\n" +
    //     "      \"outputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"name\",\n" +
    //     "          \"type\": \"string\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"dna\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"level\",\n" +
    //     "          \"type\": \"uint32\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"readyTime\",\n" +
    //     "          \"type\": \"uint32\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"winCount\",\n" +
    //     "          \"type\": \"uint16\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"lossCount\",\n" +
    //     "          \"type\": \"uint16\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"view\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_from\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"_to\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"_tokenId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"transferFrom\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": true,\n" +
    //     "      \"stateMutability\": \"payable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [],\n" +
    //     "      \"name\": \"withdraw\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": true,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_owner\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"getZombiesByOwner\",\n" +
    //     "      \"outputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"\",\n" +
    //     "          \"type\": \"uint256[]\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"view\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"x\",\n" +
    //     "          \"type\": \"string\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"set\",\n" +
    //     "      \"outputs\": \[\],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": true,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"zombieToOwner\",\n" +
    //     "      \"outputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"view\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_address\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"setKittyContractAddress\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_zombieId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"_newDna\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"changeDna\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": true,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_tokenId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"ownerOf\",\n" +
    //     "      \"outputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"view\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": true,\n" +
    //     "      \"inputs\": \[\],\n" +
    //     "      \"name\": \"get\",\n" +
    //     "      \"outputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"\",\n" +
    //     "          \"type\": \"string\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"view\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_seconds\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"setCooldownTime\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": true,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_owner\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"balanceOf\",\n" +
    //     "      \"outputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"view\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [],\n" +
    //     "      \"name\": \"renounceOwnership\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_name\",\n" +
    //     "          \"type\": \"string\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"createRandomZombie\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": true,\n" +
    //     "      \"inputs\": [],\n" +
    //     "      \"name\": \"owner\",\n" +
    //     "      \"outputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"view\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": true,\n" +
    //     "      \"inputs\": [],\n" +
    //     "      \"name\": \"isOwner\",\n" +
    //     "      \"outputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"\",\n" +
    //     "          \"type\": \"bool\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"view\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_zombieId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"_newName\",\n" +
    //     "          \"type\": \"string\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"changeName\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_fee\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"setLevelUpFee\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"_zombieId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"name\": \"_targetId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"attack\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"constant\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"name\": \"newOwner\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"transferOwnership\",\n" +
    //     "      \"outputs\": [],\n" +
    //     "      \"payable\": false,\n" +
    //     "      \"stateMutability\": \"nonpayable\",\n" +
    //     "      \"type\": \"function\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"anonymous\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"indexed\": true,\n" +
    //     "          \"name\": \"_from\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"indexed\": true,\n" +
    //     "          \"name\": \"_to\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"indexed\": true,\n" +
    //     "          \"name\": \"_tokenId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"Transfer\",\n" +
    //     "      \"type\": \"event\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"anonymous\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"indexed\": true,\n" +
    //     "          \"name\": \"_owner\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"indexed\": true,\n" +
    //     "          \"name\": \"_approved\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"indexed\": true,\n" +
    //     "          \"name\": \"_tokenId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"Approval\",\n" +
    //     "      \"type\": \"event\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"anonymous\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"indexed\": false,\n" +
    //     "          \"name\": \"zombieId\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"indexed\": false,\n" +
    //     "          \"name\": \"name\",\n" +
    //     "          \"type\": \"string\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"indexed\": false,\n" +
    //     "          \"name\": \"dna\",\n" +
    //     "          \"type\": \"uint256\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"NewZombie\",\n" +
    //     "      \"type\": \"event\"\n" +
    //     "    },\n" +
    //     "    {\n" +
    //     "      \"anonymous\": false,\n" +
    //     "      \"inputs\": [\n" +
    //     "        {\n" +
    //     "          \"indexed\": true,\n" +
    //     "          \"name\": \"previousOwner\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        },\n" +
    //     "        {\n" +
    //     "          \"indexed\": true,\n" +
    //     "          \"name\": \"newOwner\",\n" +
    //     "          \"type\": \"address\"\n" +
    //     "        }\n" +
    //     "      ],\n" +
    //     "      \"name\": \"OwnershipTransferred\",\n" +
    //     "      \"type\": \"event\"\n" +
    //     "    }\n" +
    //     "  ]");

   // CZ = new ethers.Contract('0xf01b5d859b2a73DBE407f4553b06ffF50F19b7e4', abi, signer);
    CZ = new ethers.Contract('0x34dC208f7aEFB4E04E77EE9651B25F8bF207C40d', abi, signer);
    // put state data into the REDUX store for easy access from other pages and components

    let data = { provider, signer, CZ, userAddress };
    store.dispatch(blockchainInitialized(data));
  return data;
}

export default initBlockchain;
