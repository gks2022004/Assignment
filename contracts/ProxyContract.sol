// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./SmartWallet.sol";

contract ProxyContract {
    mapping(address => address payable) public wallets;

    function getWallet() public returns (address wallet) {
        if (wallets[msg.sender] == address(0)) {
            wallets[msg.sender] = payable(address(new SmartWallet(msg.sender,address(this))));
        }
        return wallets[msg.sender];
    }

    function destroyWallet() public {
        require(wallets[msg.sender] != address(0), "No wallet to destroy");
        SmartWallet wallet = SmartWallet(wallets[msg.sender]);
        wallet.destroy(); // Call the destroy function in the SmartWallet contract
        wallets[msg.sender] = payable(address(0)); // Remove the wallet from the mapping
    }
}
