//const Connex = require('@vechain/connex').Connex;
const { mnemonic } = require('thor-devkit');
const { Driver, SimpleWallet, SimpleNet } = require('@vechain/connex-driver');
const { Framework } = require('@vechain/connex-framework');
const contract = require('./contract');

const mnemonicWords = "barely labor car just range chimney gold cable youth exile body more";

const contractAddress = "0xed5D02D6f6Ee48C29F003B4B99F7c19EC75Ba3a6";

async function run() {

    let words = mnemonicWords.split(" ");
    let privateKeyBuffer = mnemonic.derivePrivateKey(words);
    let isOk = mnemonic.validate(words);
    console.log("status:", isOk);
    console.log("privateKeyBuffer:", privateKeyBuffer.toString("hex"));

    const wallet = new SimpleWallet();
    let address = wallet.import(privateKeyBuffer.toString("hex"));
    console.log("address:", address); // 0xc21DC71E06e5f44491F4a3fCAc0f112aE5F70a6F

    const driver = await Driver.connect(new SimpleNet("https://testnet.veblocks.net/"), wallet)
    const connex = new Framework(Framework.guardDriver(driver))

    const account = connex.thor.account(contractAddress);

    // initiate a signing service to commit this method as a transaction
    let method = account.method(contract.abi[0]);
    const txSigningService = method.transact("NodeJS");

    const transactionInfo = await txSigningService
        .gas(3000000)
        .request();

    console.log("transactionInfo:", transactionInfo);

    // call the method (dry-run, without altering blockchain)
    method = account.method(contract.abi[1]);
    let result = await method.call();
    console.log("result:", result.decoded);
};

run();