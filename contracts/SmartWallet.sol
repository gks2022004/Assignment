// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SmartWallet {
    address public owner; 
    address public proxyContract;

    bool public isDestroyed = false;

    constructor(address _owner, address _proxyContract) {
        owner = _owner;
        proxyContract= _proxyContract;
    }

    // Fallback function to receive and send Ether
    fallback() external payable {
        require(!isDestroyed, "This contract is destroyed");
        require(msg.sender == owner, "Only the owner can send funds");
    }

    // Function to delegate calls to other contracts
    function delegateCall(address _to, bytes memory _data) public returns (bytes memory) {
        require(!isDestroyed, "This contract is destroyed");
        require(msg.sender == owner, "Only the owner can make delegate calls");
        (bool success, bytes memory result) = _to.delegatecall(_data);
        require(success, "Delegate call failed");
        return result;
    }

    // Function to send funds
    function sendFunds(address payable _to, uint _amount) public {
        require(!isDestroyed, "This contract is destroyed");
        require(msg.sender == owner, "Only the owner can send funds");
        _to.transfer(_amount);
    }

    // Function to receive funds
    receive() external payable {
        require(!isDestroyed, "This contract is destroyed");
    }

    // Function to check the balance of the contract
    function getBalance() public view returns (uint) {
        require(!isDestroyed, "This contract is destroyed");
        return address(this).balance;
    }

    // Function to "destroy" the contract
    function destroy() public {
        require(msg.sender == proxyContract, "Only the ProxyContract can destroy wallet");
        isDestroyed = true;
    }
}
