// Import libraries.
import { default as Web3 } from "web3"
import { default as contract } from "truffle-contract"

// Import contract abstractions and create instances.
import irondoers_json from "../build/contracts/IronDoers.json"
var IronDoers = contract(irondoers_json)

var account;

window.App = {
  start: function() {
    var self = this;
    self.setAccount();
    self.setDoerCount();
  },

  setAccount: function() {
    var accounts = web3.eth.accounts;
    if (accounts.length == 0) {
      alert("Please connect an account.");
      return;
    }
    account = accounts[0];
  },

  setDoerCount: function() {
    IronDoers.deployed().then(function (instance) {
      return instance.getDoerCount.call();
    }).then(function (value) {
      var element = document.getElementById("count");
      element.innerHTML = value.valueOf();
    });
  },

  addDoer: function() {
    var self = this;
    var address = document.getElementById("address").value;

    IronDoers.deployed().then(function(instance) {
      return instance.addDoer(address, {from: account});
    }).then(function() {
      self.setDoerCount();
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
  App.start();
});
