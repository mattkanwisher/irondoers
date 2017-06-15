pragma solidity ^0.4.0;

contract IronDoers {

	struct Doer {
		address addr;
		uint id;
	}

	address public trustee;

	mapping(address => uint) public doerIds;

	uint public doerCount;

	Doer[] public doers;

	modifier onlyTrustee {
		if (msg.sender != trustee) throw;
		_;
	}

	modifier onlyDoers {
		if (doerIds[msg.sender] == 0) throw;
		_;
	}

	function IronDoers() {
		trustee = msg.sender;
		addDoer(trustee);
	}

	function getTrustee() returns (address) {
		return trustee;
	}

	function addDoer(address addr) onlyTrustee {
		uint id;
		if (doerIds[addr] == 0) {
			doerIds[addr] = doers.length;
			id = doers.length++;
			doers[id] = Doer({addr: addr, id: id});
		}
		doerCount = doers.length;
	}

	function getDoerCount() returns (uint) {
		return doerCount;
	}
}
