pragma solidity ^0.4.0;

import "./IronDoersAbstract.sol";

contract IronToken {

    address public deployer;
    IronDoersAbstract public doers;

    modifier onlyDoers {
        if (doers.isDoer(msg.sender) != true) throw;
        _;
    }

    function IronToken(IronDoersAbstract abs) {
        deployer = msg.sender;
        doers = abs;
    }

    function getDeployer() constant returns (address) {
        return deployer;
    }

    function getDoers() constant returns (IronDoersAbstract) {
        return doers;
    }
}
