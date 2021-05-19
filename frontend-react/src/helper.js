import BigNumber from 'bignumber.js'
const e18 = new BigNumber(1e18);

function toWei(v) {
    return new BigNumber(v).times(e18).toString(10)
}

function fromWei(v) {
    return new BigNumber(v).div(e18).toString(10)
}