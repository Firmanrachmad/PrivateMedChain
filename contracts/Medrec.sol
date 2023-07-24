// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Medrec {
    uint256 idDigit = 8;
    uint256 digitMod = idDigit ** 10;
    address private officer;

    struct Record {
        string hashValue;
        address patientId;
        address doctorId;
        uint256 timeAdded;
    }

    mapping(address => uint256[]) private _listId;
    mapping(uint256 => Record) private _idToRecord;
    mapping(address => bool) private doctors;
    mapping(address => bool) private patient;


    modifier senderIsDoctor() {
        require(doctors[msg.sender], "Sender is not a doctor");
        _;
    }

    modifier senderIsOfficer() {
        require(msg.sender==officer, "Sender is not an officer");
        _;
    }

    constructor(address _officer) {
        officer = _officer;
    }


    function addDoctor(address _doctorAddress) external senderIsOfficer{
        require(_doctorAddress != address(0), "Doctor Address Null");
        require(!doctors[_doctorAddress], "Doctor Address Already Exists");
        doctors[_doctorAddress] = true;
    }

    function addPatient(address _patientAddress) external senderIsOfficer {
        require(_patientAddress != address(0), "Patient Address Null");
        require(!patient[_patientAddress], "Patient Address Already Exists");
        patient[_patientAddress] = true;
    }

    function addRecord(string memory _hashValue, address _patienAddress) external {
        require(_patienAddress != address(0));
        require(patient[_patienAddress]);
        uint256 _id = _generateId(_patienAddress, msg.sender);
        _listId[_patienAddress].push(_id);
        _idToRecord[_id] = Record(_hashValue, _patienAddress, msg.sender, block.timestamp);
    }

    function getRecordLIst(address _patien) external view returns(uint256[] memory) {
        return _listId[_patien];
    }

    function getRecordData(uint256 _id) external view returns(string memory, address, uint256) {
        return (_idToRecord[_id].hashValue, _idToRecord[_id].doctorId, _idToRecord[_id].timeAdded);
    }

    function _generateId(address _patiendAddress, address _senderAddress) private view returns(uint256 _id) {
        _id = uint256(
            keccak256(
                abi.encodePacked(_patiendAddress, _senderAddress, block.timestamp)
            )
        ) % digitMod;
    }
}
