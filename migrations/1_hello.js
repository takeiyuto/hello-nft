const myNFT = artifacts.require("Hello");

module.exports = function(_deployer) {
    _deployer.deploy(myNFT);
};
