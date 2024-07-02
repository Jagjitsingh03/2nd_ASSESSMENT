require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  paths: {
    sources: "./contracts", // Path to your Solidity contracts
    tests: "./test", // Path to your tests
    cache: "./cache", // Path to cache directory
    artifacts: "./artifacts", // Path to compiled contracts artifacts
  },
  networks: {
    // Example network configuration (you can add more networks as needed)
    hardhat: {
      chainId: 1337, // Replace with your desired chain ID
    },
  },
};
