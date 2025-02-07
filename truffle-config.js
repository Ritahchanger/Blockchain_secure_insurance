module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, // Make sure this is 8545
      network_id: "*", // Match any network id
    },
  },

  compilers: {
    solc: {
      version: "0.5.16", // Set to a stable version within the range you use
    },
  },
};
