var IronDoers = artifacts.require("./IronDoers.sol");
var IronPromise = artifacts.require("./IronPromise.sol");
var IronToken = artifacts.require("./IronToken.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(IronDoers).then(function() {
    return deployer.deploy(IronPromise, IronDoers.address);
  }).then(function() {
    return deployer.deploy(IronToken);
  });
};
