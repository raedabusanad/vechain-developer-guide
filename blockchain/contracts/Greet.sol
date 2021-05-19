// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Greet {
    string user;

    function store(string memory name) public {
        user = name;
    }

    function hello() public view returns (string memory) {
        return user;
    }
}