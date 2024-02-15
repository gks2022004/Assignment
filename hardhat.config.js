require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      forking: {
        url: "https://ethereum-sepolia.publicnode.com",
      },
      accounts: [{
        privateKey: process.env.PRIVATE_KEY,
        balance: "10000000000000000000000", // 10,000 ETH
      },
      {
      privateKey:process.env.PRIVATE_KEY1,
      balance:"0",
      }
    ],
    },
    sepolia:{
      url:"https://ethereum-sepolia.publicnode.com",
      accounts:[process.env.PRIVATE_KEY]
    }
  },
};
