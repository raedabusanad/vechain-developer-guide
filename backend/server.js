const Connex = require('@vechain/connex').Connex;
const contract = require('./contract');

const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
});

const myAccountAddress = "0x46E305b4E1883a5f1f104464dcEdcbd2618D9EA9";

const contractAddress = "0xed5D02D6f6Ee48C29F003B4B99F7c19EC75Ba3a6";

const account = connex.thor.account(myAccountAddress);

const method = account.method(contract[1]);

/** call the method (dry-run, without altering blockchain) */
let result = await method.call();
console.log("result:", result.decoded);