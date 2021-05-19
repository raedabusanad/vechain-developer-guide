import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import Connex from '@vechain/connex';

const myAccountAddress = "0x46E305b4E1883a5f1f104464dcEdcbd2618D9EA9";

const toAccountAddress = "0xa8535f57f3642EBEAe04Bc9864A612AB5Be874FC";

const contractAddress = "0xed5D02D6f6Ee48C29F003B4B99F7c19EC75Ba3a6";

const contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "store",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "hello",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

function App() {

	const [name, setName] = useState("");
	const [read, setRead] = useState("");
	const [accInfo, setAccInfo] = useState({});
	const [contractInfo, setContractInfo] = useState({});
	const [connex, setConnex] = useState(null);
	const [loading, setLoading] = useState(false);
	const [tx, setTx] = useState("");

	const initialise = async () => {

		setLoading(true);

		try {
			const connex = new Connex({
				node: 'https://testnet.veblocks.net/',
				network: 'test'
			});

			const account = connex.thor.account(myAccountAddress);

			const accountInfo = await account.get();
			console.log("accInfo:", accountInfo);
			let status = connex.thor.status;
			console.log("status:", status);

			const contractAccount = connex.thor.account(contractAddress);
			const contractInfo = await contractAccount.get();
			console.log("contractAccount:", contractAccount);

			setContractInfo(contractInfo);
			setAccInfo(accountInfo);
			setConnex(connex);
		} catch (err) {
			console.error(err);
		}

		setLoading(false);
	}

	useEffect(() => {
		initialise();
	}, []);

	const handleWrite = async () => {

		if (!name) {
			return;
		}

		setLoading(true);

		const acc = connex.thor.account(contractAddress);
		const method = acc.method(contractABI[0]);

		/** initiate a signing service to commit this method as a transaction */
		const txSigningService = method.transact(name);

		const transactionInfo = await txSigningService
			.gas(3000000)
			.request();

		console.log("transactionInfo:", transactionInfo);
		setTx("https://explore-testnet.vechain.org/transactions/" + transactionInfo.txid);
		setLoading(false);
	}

	const handleRead = async () => {
		setLoading(true);
		const acc = connex.thor.account(contractAddress);
		const method = acc.method(contractABI[1]);

		/** call the method (dry-run, without altering blockchain) */
		let result = await method.call();
		console.log("result:", result.decoded);

		setRead(result.decoded[0]);
		setLoading(false);
	}

	return (
		<div className="App">
			<h2>Account Info</h2>
			<div>{JSON.stringify(accInfo)}</div>
			<br />

			<h2>Contract Info</h2>
			<div>{JSON.stringify(contractInfo)}</div>
			<div><a href='https://explore-testnet.vechain.org/accounts/0xed5d02d6f6ee48c29f003b4b99f7c19ec75ba3a6' target="_blank">VeChain Explorer - Deployed Contract</a></div>
			<br />

			<h2>Write operation</h2>
			<h4>Requires transaction to be signed your using private key and VTHO availability.</h4>
			<input type="text" name="store" onChange={e => setName(e.target.value)} />

			<button onClick={handleWrite}>
				Set name
      		</button>
			<div>
				<a href={tx} target="_blank">{tx}</a>
			</div>
			<br />
			<br />

			<h2>Read operation</h2>
			<button onClick={handleRead}>
				Read
      		</button>
			<div style={{ margin: 10 }}>{read}</div>

			{loading &&
				<div>
					<img src={logo} className="App-logo" alt="logo" />
				</div>
			}
		</div>
	);
}

export default App;
