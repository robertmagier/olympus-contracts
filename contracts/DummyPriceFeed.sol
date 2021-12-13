//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.5;

contract DummyPriceFeed {
    int256 price;
    uint256 _decimals;

    constructor(int256 _p, uint256 _d) {
        price = _p;
        _decimals = _d;
    }

    function decimals() public view returns (uint256) {
        return _decimals;
    }

    function latestRoundData()
        public
        view
        returns (
            uint80 _roundID,
            int256 _price,
            uint256 _startedAt,
            uint256 _timestamp,
            uint80 _answeredInRound
        )
    {
        _roundID = 1;
        _startedAt = 1;
        _timestamp = 1;
        _answeredInRound = 1;
        return (_roundID, price, _startedAt, _timestamp, _answeredInRound);
    }
}
