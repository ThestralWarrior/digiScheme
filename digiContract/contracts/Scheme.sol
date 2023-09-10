// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Scheme {
    // defines the list of criteria **now includes location as a criteria
    struct Criteria {
        string age;
        string gender;
        string occupation;
        string income;
        string religion;
        string caste;
        string location;
    }

    // variable declarations
    Criteria public criteria;
    address public owner;
    uint256 public eligibleAmount;
    bool private addressesAssigned;
    mapping(address => bool) public eligibleAddresses;

    // event declarations
    event FundsAdded(uint256 amount, uint256 balance);
    event FundsTransferred(uint256 indexed amount, address indexed wallet);
    event FundsWithdrawn(uint256 amount, uint256 balance);

    // requires function to be called with the same address as the owner
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    // requires function to be called by one of the addresses that are in elligibleAddresses
    modifier onlyEligible {
        require(eligibleAddresses[msg.sender] == true, "Account not eligible to access contract");
        _;
    }

    // construction of scheme contract requires the elligiblity criteria + payable **location assignment added as well
    constructor(string memory age, string memory gender, string memory occupation, string memory income, string memory religion, string memory caste, string memory location, uint256 eligibleSum) payable {
        owner = msg.sender;
        criteria = Criteria(age, gender, occupation, income, religion, caste, location);
        eligibleAmount = eligibleSum;
        addressesAssigned = false;
    }

    // to be called when the owner contract wants to add funds to the scheme contract
    function addFunds() payable external onlyOwner {
        emit FundsAdded(msg.value, address(this).balance);
    }

    //for withdrawing funds
    function withdrawFunds(uint256 amount) external onlyOwner {
        require(amount > 0, "Withdraw amount cannot be 0");
        require(address(this).balance >= amount, "Not enough balance in the contract");
        address payable destination = payable(owner);
        (bool sent,) = destination.call{value: amount}("");
        require(sent, "Transfer of ETH has failed");
        emit FundsWithdrawn(amount, address(this).balance);
    }

    // transfers funds if destination is elligible
    function transfer() external onlyEligible {
        require(address(this).balance >= eligibleAmount, "Not sufficient funds");
        address payable destination = payable(msg.sender);
        (bool sent,) = destination.call{value: eligibleAmount}("");
        require(sent, "Transfer of ETH has failed");
        emit FundsTransferred(eligibleAmount, destination);
        eligibleAddresses[msg.sender] = false;
    }

    // fallback function rejects any ether transactions other than the owner
    receive() external payable {
        revert("Contract will only accept funds from owner via addFunds()");
    }

    // assigns the elligible addresses **now can be called by owner only
    function setAddresses(address[] memory _addresses) external onlyOwner {
        require(addressesAssigned == false, "Addresses have already been assigned");
        uint256 length = _addresses.length;
        for(uint i = 0; i < length; i++) {
            eligibleAddresses[_addresses[i]] = true;
        }
        addressesAssigned = true;
    }

    // returns the balance of the contract
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // changes ownership of contract
    function changeOwner(address _address) external onlyOwner {
        owner = _address;
    }
}
