var Web3 = require("web3");
var contract = require("truffle-contract");
var IronDoers = contract(require("../build/contracts/IronDoers.json"));
var IronPromise = contract(require("../build/contracts/IronPromise.json"));
require("bootstrap");
var account;

window.App = {
  start: function() {
    this.setDoerCount();
    this.setFulfillmentCount();
  },

  setAlert: function(message, type) {
    type = type || "info";
    var element = document.getElementById("alerts");
    element.innerHTML = "<div class='alert alert-" + type + "'>" + message + "</div>";
  },

  throwError: function(message, err) {
    err = err || message;
    this.setAlert("<strong>Error!</strong> " + message, "danger");
    throw err;
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
    }).then(function(value) {
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
    });
  }
};

window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  try {
    var accounts = web3.eth.accounts;
  } catch(err) {
    App.throwError("Use a browser that can browse the decentralized web!", err);
  }
  if (accounts.length == 0) {
    App.throwError("Connect an account!");
  }
  account = accounts[0];
  IronDoers.setProvider(web3.currentProvider);
  IronPromise.setProvider(web3.currentProvider);
  App.start();
});
