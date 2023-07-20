// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Medrec {
    struct Record {
        string hashValue;
        address patientId;
        address doctorId;
        address officerId;
        uint256 timeAdded;
    }

    struct Patient {
        address id;
        Record[] records;
        mapping(address => bool) assignedDoctors; // Mapping to track assigned doctors
    }

    mapping(address => Patient) public patients;
    mapping(address => bool) public doctors;
    address public officer;

    event PatientAdded(address patientId);
    event DoctorAdded(address doctorId);
    event RecordAdded(string hashValue, address patientId, address doctorId, address officerId);

    modifier senderIsDoctor() {
        require(doctors[msg.sender], "Sender is not a doctor");
        _;
    }

    modifier senderIsPatient() {
        require(patients[msg.sender].id == msg.sender, "Sender is not a patient");
        _;
    }

    modifier senderIsOfficer() {
        require(msg.sender == officer, "Sender is not an officer");
        _;
    }


    function addPatient() public {
        require(patients[msg.sender].id == address(0), "This patient already exists.");
        patients[msg.sender].id = msg.sender;

        emit PatientAdded(msg.sender);
    }

    function addDoctor() public {
        require(!doctors[msg.sender], "This doctor already exists.");
        doctors[msg.sender] = true;

        emit DoctorAdded(msg.sender);
    }

    function assignDoctor(address doctorAddress) public senderIsDoctor senderIsOfficer {
        require(doctors[doctorAddress], "The provided address is not a doctor");
        patients[msg.sender].assignedDoctors[doctorAddress] = true;
    }

    function setOfficer(address officerAddress) public {
        officer = officerAddress;
    }

    function addRecord(string memory _hashValue, address _patientId) public senderIsDoctor {
        require(patients[_patientId].id == _patientId, "Patient does not exist");
        require(patients[_patientId].assignedDoctors[msg.sender], "Sender is not the assigned doctor for this patient");

        Record memory record = Record(_hashValue, _patientId, msg.sender, officer, block.timestamp);
        patients[_patientId].records.push(record);

        emit RecordAdded(_hashValue, _patientId, msg.sender, officer);
    }

    function getRecords(address _patientId) public view senderIsPatient returns (Record[] memory) {
        require(patients[_patientId].id == _patientId, "Patient does not exist");
        return patients[_patientId].records;
    }
}
