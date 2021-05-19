import BigNumber from 'bignumber.js';
const e18 = new BigNumber(1e18);

function toWei(v) {
    return new BigNumber(v).times(e18).toString(10)
}

function fromWei(v) {
    return new BigNumber(v).div(e18).toString(10)
}

async function transfer(connex, to, ammount) {

    var vetamount = "0x" + (ammount * 1e18).toString(16);
    var comment = "send " + ammount + " VET";
    let msg = {
        comment,
        to,
        value: vetamount
    };

    //asked for sync2 confirmation
    const signingService = connex.vendor.sign('tx', [msg]);
    let resp = await signingService.request();
    console.log("resp:", resp);
}