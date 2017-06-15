var IronDoers = artifacts.require("./IronDoers.sol");

contract("IronDoers", function(accounts) {
  it("should set the trustee", function() {
    var iron;
    return IronDoers.deployed().then(function(instance) {
      iron = instance;
      // Calls (i.e. reading the blockchain) are run with a chained function.
      return iron.getTrustee.call();
    }).then(function(trustee) {
      assert.equal(trustee, accounts[0], "Trustee was not set correctly");
    }).then(function() {
      return iron.getDoerCount.call();
    }).then(function(count) {
      assert.equal(count, 1, "Doer count is wrong");
    });
  });

  it("should let the trustee add doers", function() {
    return IronDoers.deployed().then(function(instance) {
      iron = instance;
      // Transactions (i.e. writing to the blockchain) are run without chained function.
      iron.addDoer(accounts[1]);
    }).then(function() {
      return iron.getDoerCount.call();
    }).then(function(count) {
      assert.equal(count, 2, "Second doer was not added");
    });
  });

  it("should not let anyone add doers", function() {
    return IronDoers.deployed().then(function(instance) {
      iron = instance;
      // With Truffle you can pass an additional magic parameter that overrides the transaction sender. This way, we can
      // test transactions from accounts other than account[0] who created the contract.
      // This transaction
      return iron.addDoer(accounts[3], {from: accounts[3]});
    }).then(function() {
      assert(false, "Anyone should not be able to add doers");
    }).catch(function(err) {
      if (err.toString().indexOf("invalid opcode") != -1) {
        assert(true, "Anyone should not be able to add doers");
      }
      else {
        assert(false, err.toString())
      }
    });
  });

});
