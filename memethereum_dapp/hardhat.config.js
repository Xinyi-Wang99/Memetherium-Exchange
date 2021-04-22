require("@nomiclabs/hardhat-waffle");

const INFURA_PROJECT_ID = "5374c910d5df4b7eb1b64fa2e27fd19e";
const RINKEBY_PRIVATE_KEY = "c198614acd52a2125001240f70133b76248d3009cadf225895cb9f61b0225ee5";

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    paths: {
        sources: "./contracts",
        artifacts: "./build",
    },
    solidity: "0.5.1",
    networks: {
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
        }
    }
};
