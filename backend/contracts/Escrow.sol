// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    uint256 public amount;
    bool public isReleased;
    bool public isRefunded;

    event FundsDeposited(address indexed buyer, uint256 amount);
    event FundsReleased(address indexed seller, uint256 amount);
    event FundsRefunded(address indexed buyer, uint256 amount);

    constructor(address _seller) payable {
        require(_seller != address(0), "Invalid seller address");
        buyer = msg.sender;
        seller = _seller;
        amount = msg.value;
        require(amount > 0, "Amount must be greater than 0");
        emit FundsDeposited(buyer, amount);
    }

    function release() external {
        require(msg.sender == buyer, "Only buyer can release funds");
        require(!isReleased && !isRefunded, "Escrow already settled");
        require(address(this).balance >= amount, "Insufficient contract balance");
        isReleased = true;
        uint256 transferAmount = amount;
        amount = 0;
        payable(seller).transfer(transferAmount);
        emit FundsReleased(seller, transferAmount);
    }

    function refund() external {
        require(msg.sender == seller, "Only seller can refund");
        require(!isReleased && !isRefunded, "Escrow already settled");
        require(address(this).balance >= amount, "Insufficient contract balance");
        isRefunded = true;
        uint256 transferAmount = amount;
        amount = 0;
        payable(buyer).transfer(transferAmount);
        emit FundsRefunded(buyer, transferAmount);
    }

    function getStatus() external view returns (string memory) {
        if (isReleased) return "released";
        if (isRefunded) return "refunded";
        return "held";
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}