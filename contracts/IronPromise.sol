pragma solidity ^0.4.0;

import "./IronDoersAbstract.sol";

contract IronPromise {

    address public deployer;

    IronDoersAbstract public doers;

    struct Fulfillment {
        address doer;
        string proof;
        uint timestamp;
        bytes32 hash;
    }

    mapping(bytes32 => Fulfillment) public fulfillments;

    uint public fulfillmentCount;

    modifier onlyDoers {
        if (doers.isDoer(msg.sender) != true) throw;
        _;
    }

    function IronPromise(IronDoersAbstract abs) {
        fulfillmentCount = 0;
        deployer = msg.sender;
        doers = abs;
    }

    function getDeployer() constant returns (address) {
        return deployer;
    }

    function getDoers() constant returns (IronDoersAbstract) {
        return doers;
    }

    function fulfill(string proof) onlyDoers {
        bytes32 hash = sha3(msg.sender, proof);
        fulfillments[hash] = Fulfillment({doer: msg.sender, proof: proof, timestamp: block.timestamp, hash: hash});
        fulfillmentCount++;
    }

    function getFulfillmentCount() constant returns (uint) {
        return fulfillmentCount;
    }
}
