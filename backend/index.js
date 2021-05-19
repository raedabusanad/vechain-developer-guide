//const Connex = require('@vechain/connex').Connex;
const contract = require('./contract');
const { Transaction, secp256k1, mnemonic } = require('thor-devkit');
const { Driver, SimpleWallet, SimpleNet } = require('@vechain/connex-driver');
const { Framework } = require('@vechain/connex-framework');

// const connex = new Connex({
//     node: 'https://testnet.veblocks.net/',
//     network: 'test'
// });
//console.log("status:", connex.thor.status);

const mnemonicWords = "barely labor car just range chimney gold cable youth exile body more";

const myAccountAddress = "0xc21DC71E06e5f44491F4a3fCAc0f112aE5F70a6F";

const contractAddress = "0xed5D02D6f6Ee48C29F003B4B99F7c19EC75Ba3a6";

async function run() {

    //let words = mnemonic.generate();
    let words = mnemonicWords.split(" ");
    let privateKeyBuffer = mnemonic.derivePrivateKey(words);
    let ok = mnemonic.validate(words);
    console.log("status:", ok);
    console.log("privateKeyBuffer:", privateKeyBuffer.toString("hex"));

    const wallet = new SimpleWallet();
    wallet.import(privateKeyBuffer.toString("hex"));

    const driver = await Driver.connect(new SimpleNet("https://testnet.veblocks.net/"), wallet)
    const connex = new Framework(Framework.guardDriver(driver))

    const account = connex.thor.account(myAccountAddress);
    const method = account.method(contract.abi[1]);

    /** call the method (dry-run, without altering blockchain) */
    let result = await method.call();
    console.log("result:", result.decoded);


};


run();