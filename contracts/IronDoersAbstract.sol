pragma solidity ^0.4.0;

contract IronDoersAbstract {

	function getTrustee() constant returns (address);

	function addDoer(address addr);

	function isDoer(address addr) constant returns (bool);

	function getDoerCount() constant returns (uint);
}
