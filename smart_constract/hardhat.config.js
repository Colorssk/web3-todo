require("@nomiclabs/hardhat-waffle")
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: 'https://eth-goerli.alchemyapi.io/v2/dsPyXyKXG_bP8cuv4ieX_L3KSJVkkZVP',
      accounts: [
        '63443c630b26fc5b7d5664d71165d72494cd756ca53cf4ab7629e927aa9430a5',
      ],
    },
  },
};
