var IronDoers = artifacts.require("./IronDoers.sol");

function assertThrow(err, test, msg) {
  if (err.toString().indexOf(test) != -1) {
    assert(true, msg);
  } else {
    assert(false, err.toString())
  }
}

contract("IronDoers", function(accounts) {
  it("should set the trustee", function() {
    var iron;
    return IronDoers.deployed().then(function(instance) {
      iron = instance;
      return iron.getTrustee.call();
    }).then(function(trustee) {
      assert.equal(trustee, accounts[0]);
    }).then(function() {
      return iron.getDoerCount.call();
    }).then(function(count) {
      assert.equal(count, 1);
    });
  });

  it("should validate doers", function() {
    return IronDoers.deployed().then(function(instance) {
      iron = instance;
      return iron.isDoer.call(accounts[0]);
    }).then(function(bool) {
      assert.equal(bool, true);
    }).then(function() {
      return iron.isDoer.call(accounts[1]);
    }).then(function(bool) {
      assert.equal(bool, false);
    });
  });

  it("should only let the trustee add doers", function() {
    return IronDoers.deployed().then(function(instance) {
      iron = instance;
      return iron.addDoer(accounts[1], {from: accounts[0]});
    }).then(function() {
      return iron.getDoerCount.call();
    }).then(function(count) {
      assert.equal(count, 2);
    }).then(function() {
      return iron.addDoer(accounts[2], {from: accounts[1]});
    }).catch(function(err) {
      assertThrow(err, "invalid opcode");
    }).then(function() {
      return iron.getDoerCount.call();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });

});
