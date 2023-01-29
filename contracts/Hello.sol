// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Hello is ERC721Enumerable {
    string private constant _name = "Hello NFT";    // ​適当なトークン名に変更する
    string private constant _symbol = "HELO";       // 適当なシンボルに変更する

    constructor() ERC721(_name, _symbol) {}

    uint256 public id;

    receive() external payable {
        _mint(msg.sender, ++id);
    }
}
