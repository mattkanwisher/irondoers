var IronDoers = artifacts.require("./IronDoers.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(IronDoers);
};
