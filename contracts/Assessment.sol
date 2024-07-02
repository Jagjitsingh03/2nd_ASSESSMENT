// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    bool public paused;

//These are events that are emitted when certain actions occur in the contract

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event Paused(address account);
    event Unpaused(address account);

    constructor(uint256 initBalance) payable {
        owner = payable(msg.sender);                  //initializes the owner with the address of the deployer
        balance = initBalance;
        paused = false;
    }

    modifier onlyOwner() {    
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "The contract is paused");
        _;
    }

    modifier whenPaused() {
        require(paused, "The contract is not paused");
        _;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        balance += _amount;
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public onlyOwner {
        require(balance >= _withdrawAmount, "Insufficient balance");
        balance -= _withdrawAmount;
        emit Withdraw(_withdrawAmount);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = payable(newOwner);
    }

    function pause() public onlyOwner whenNotPaused {
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() public onlyOwner whenPaused {
        paused = false;
        emit Unpaused(msg.sender);
    }
}