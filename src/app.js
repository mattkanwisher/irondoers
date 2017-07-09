// Import libraries.

var $ = require("jquery");
var bootstrap = require("bootstrap");

var Web3 = require("web3");
var contract = require("truffle-contract");

var IronDoers = contract(require("../build/contracts/IronDoers.json"));
var IronPromise = contract(require("../build/contracts/IronPromise.json"));

var account;

window.App = {
  start: function() {
    var self = this;
    self.setAccount();
    self.setDoerCount();
    self.setFulfillmentCount();
  },

  setAlert: function(message, type) {
    type = type || "info";
    var element = document.getElementById("alerts");
    element.innerHTML = "<div class='alert alert-" + type + "'>" + message + "</div>";
  },

  setError: function(message) {
    this.setAlert("<strong>Error!</strong> " + message, "danger");
    throw message;
  },

  setAccount: function() {
    var accounts = web3.eth.accounts;
    if (accounts.length == 0) {
      this.setError("Please connect an account!");
    }
    account = accounts[0];
  },

  setDoerCount: function() {
    IronDoers.deployed().then(function (instance) {
      return instance.getDoerCount.call();
    }).then(function (value) {
      var element = document.getElementById("doer-count");
      element.innerHTML = value.valueOf();
    });
  },

  setFulfillmentCount: function() {
    IronPromise.deployed().then(function (instance) {
      return instance.getFulfillmentCount.call();
    }).then(function (value) {
      var element = document.getElementById("fulfillment-count");
      element.innerHTML = value.valueOf();
    });
  },

  addDoer: function() {
    var self = this;
    var address = document.getElementById("doer-address").value;

    IronDoers.deployed().then(function(instance) {
      self.setAlert("Adding doer...");
      return instance.addDoer(address, {from: account});
    }).then(function() {
      self.setDoerCount();
      self.setAlert("Doer was added!", "success");
    }).catch(function(e) {
      console.log(e);
    });
  },

  fulfill: function() {
    var self = this;
    var proof = document.getElementById("fulfillment-proof").value;

    IronPromise.deployed().then(function(instance) {
      self.setAlert("Submitting fulfillment proof...");
      return instance.fulfill(proof, {from: account});
    }).then(function() {
      self.setFulfillmentCount();
      self.setAlert("Fulfillment proof was submitted!", "success");
    }).catch(function(e) {
      console.log(e);
    });
  }
};

window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  IronDoers.setProvider(web3.currentProvider);
  IronPromise.setProvider(web3.currentProvider);
  App.start();
});
