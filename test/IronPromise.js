var IronDoers = artifacts.require("./IronDoers.sol");
var IronPromise = artifacts.require("./IronPromise.sol");

function assertThrow(err, test, msg) {
  if (err.toString().indexOf(test) != -1) {
    assert(true, msg);
  } else {
    assert(false, err.toString())
  }
}

contract("IronPromise", function(accounts) {
  it("should set deployer and doers", function() {
    var iron;
    return IronPromise.deployed().then(function(instance) {
      iron = instance;
      return iron.getDeployer.call();
    }).then(function(addr) {
      assert.equal(addr, accounts[0]);
    }).then(function() {
      return iron.getDoers.call();
    }).then(function(addr) {
      assert.equal(addr, IronDoers.address);
    });
  });

  it("should initially not have any fulfillments", function() {
    var iron;
    return IronPromise.deployed().then(function(instance) {
      iron = instance;
      return iron.getFulfillmentCount.call();
    }).then(function(count) {
      assert.equal(count, 0);
    });
  });

  it("should only let doers fulfill a promise", function() {
    var iron;
    return IronPromise.deployed().then(function(instance) {
      iron = instance;
      return iron.fulfill("foo", {from: accounts[0]});
    }).then(function() {
      return iron.getFulfillmentCount.call();
    }).then(function(count) {
      assert.equal(count, 1);
    }).then(function() {
      return iron.fulfill("example.com/foo", {from: accounts[2]});
    }).catch(function(err) {
      assertThrow(err, "invalid opcode");
    }).then(function() {
      return iron.getFulfillmentCount.call();
    }).then(function(count) {
      assert.equal(count, 1);
    });
  });

});
