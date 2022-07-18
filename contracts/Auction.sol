// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Auction is Ownable {
    using Counters for Counters.Counter;

    address payable public beneficiary;
    uint public auctionEndTime;

    address public highestBidder;
    uint public highestBid;

    uint biddingTime;
    address public owner;
    // uint public bidItem;

    Counters.Counter private _bidItemId;

    mapping(uint256 => BidItem) private bidItemIdToBidItems;

    struct BidItem {
        uint256 bidItemId;
        address payable owner;
        uint256 price;
        bool sold;
        bool canceled;
    }

    mapping(address => uint) public pendingReturns;

    bool ended;

    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    error AuctionAlreadyEnded();
    error BidNotHighEnough(uint highestBid);

    error AuctionNotYetEnded();
    error AuctionEndAlreadyCalled();

    constructor() {
        owner = msg.sender;
    }

    // modifier onlyOwner() {
    //     require(
    //         owner == msg.sender,
    //         "Only the Contract Owner can call this function"
    //     );
    //     _;
    // }

    function auction(
        uint _price,
        uint _biddingTime,
        address payable _beneficiaryAddress
    ) public returns (bool success) {

        _bidItemId.increment();

        uint256 bidItemId = _bidItemId.current();

        bidItemIdToBidItems[bidItemId] = BidItem({
            bidItemId,
            msg.sender,
            _price,
            false,
            false
        });
        // bidItem = _item;
        biddingTime = _biddingTime;
        beneficiary = _beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
        return success;
    }

    function bid() external payable {
        if (block.timestamp > auctionEndTime) {
            revert AuctionAlreadyEnded();
        }

        if (msg.value <= highestBid) {
            revert BidNotHighEnough(highestBid);
        }

        if (highestBid != 0) {
            pendingReturns[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;

            if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }

        return true;
    }

    function auctionEnd() external {
        if (block.timestamp < auctionEndTime) {
            revert AuctionNotYetEnded();
        }

        if (ended) {
            revert AuctionAlreadyEnded();
        }

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
