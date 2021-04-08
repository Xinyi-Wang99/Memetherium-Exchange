require("@nomiclabs/hardhat-waffle");

const INFURA_PROJECT_ID = "5374c910d5df4b7eb1b64fa2e27fd19e";
const RINKEBY_PRIVATE_KEY = "1cbf77031045b3086b15640ff65f6728ee8168a89e54545f443668cf379e9b6f";

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
