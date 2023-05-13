// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Medrec {
    string public textRaw;

    address private owner;

    constructor(string memory _textRaw){
        owner = msg.sender;
        console.log("Deploying a Medrec with textRaw:", _textRaw);
        textRaw = _textRaw;
    }

    function teks() public view returns(string memory){
        return textRaw;
    }

    function textInput(string calldata _text) external {
        textRaw = _text;
    }

    function inc() external {
        require(msg.sender == owner, "NOT_OWNER");
    }

    function getPemilik() public view returns(address){
        return owner;
    }

    

}