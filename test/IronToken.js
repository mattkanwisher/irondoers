var IronToken = artifacts.require("./IronToken.sol");

contract("IronToken", function(accounts) {
  it("should set the deployer", function() {
    var iron;
    return IronToken.deployed().then(function(instance) {
      iron = instance;
      return iron.getDeployer.call();
    }).then(function(addr) {
      assert.equal(addr, accounts[0], "Deployer was not set correctly");
    });
  });

});
