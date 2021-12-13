const BN = require("bignumber.js");

let amount = new BN(100).shiftedBy(18 + 6);

console.log(amount.toFormat());
console.log(amount.div(Math.pow(10, 18)).toFormat());
