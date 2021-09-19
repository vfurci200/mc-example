// SPDX-License-Identifier: unlicensed
pragma solidity >=0.7.1;
// pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "../libraries/BaseLibrary.sol";

contract MCExample {
  using SafeERC20 for IERC20;
  using SafeMath for uint;
  using Counters for Counters.Counter;

  // wrapped eth address on polygon, can also be a stablecoin like USDC
  address public constant WETH = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619;

  // booking storage
  mapping(uint => Booking) public bookings;

  // OZ counter
  Counters.Counter private bookingIdTracker;

  // each booking has these fields
  struct Booking {
    uint bookingId;
    uint startDate;
    uint endDate;
    uint camperId;
    uint price;
    string customerName;
    address customerAddress;
    address token;
  }

  constructor() public {

  }

  /* register booking */
  function registerBooking(uint startDate, uint endDate, uint camperId, string calldata customerName, uint price) public {
      /* TO DO: require campervan to be available on those dates */
      /* require buyer to have enough money to pay */
      require(IERC20(WETH).balanceOf(msg.sender)> price, 'MC: Not enough balance.');
      bookingIdTracker.increment();
      uint idNumber = bookingIdTracker.current();
      string memory bookingIdentifier = BaseLibrary.append("MC",BaseLibrary.uint2str(idNumber));
      ERC721 newNFT = new ERC721("MC Booking NFT", bookingIdentifier);
      uint bookingId = _bookingStorage(startDate, endDate, camperId, customerName, msg.sender, price, address(newNFT));

  }

  function _bookingStorage(
    uint startDate,
    uint endDate,
    uint camperId,
    string memory customerName,
    address customerAddress,
    uint price,
    address newNFT) internal returns (uint){
      uint bookingId = bookingIdTracker.current();
      // the booking is now saved on the blockchain
      Booking storage booking = bookings[bookingId];
      booking.bookingId = bookingId;
      booking.startDate = startDate;
      booking.endDate = endDate;
      booking.camperId = camperId;
      booking.customerName = customerName;
      booking.customerAddress = customerAddress;
      booking.token = newNFT;

      return bookingId;
  }


  // fallback function
  receive() external payable { }

}
