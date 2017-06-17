pragma solidity ^0.4.0;

import "./IronDoersAbstract.sol";

contract IronDoers is IronDoersAbstract {

	address public trustee;

	mapping(address => bool) public doers;

	uint public doerCount;

	modifier onlyTrustee {
		if (msg.sender != trustee) throw;
		_;
	}

	modifier onlyDoers {
		if (!doers[msg.sender]) throw;
		_;
	}

	function IronDoers() {
		doerCount = 0;
		trustee = msg.sender;
		addDoer(trustee);
	}

	function getTrustee() constant returns (address) {
		return trustee;
	}

	function addDoer(address addr) onlyTrustee {
		doers[addr] = true;
		doerCount++;
	}

	function isDoer(address addr) constant returns (bool) {
		if (doers[addr]) return true;
		return false;
	}

	function getDoerCount() constant returns (uint) {
		return doerCount;
	}
}
