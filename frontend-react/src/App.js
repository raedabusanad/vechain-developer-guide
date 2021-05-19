import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import Connex from '@vechain/connex'

const myAccountAddress = "0x46E305b4E1883a5f1f104464dcEdcbd2618D9EA9";

const toAccountAddress = "0xa8535f57f3642EBEAe04Bc9864A612AB5Be874FC";

const contractAddress = "";

const contractABI = "";

function App() {

	const [name, setName] = useState("");
	const [result, setResult] = useState("");
	const [accInfo, setAccInfo] = useState({});
	const [contractInfo, setContractInfo] = useState({});
	const [connex, setConnex] = useState(null);
	const [account, setAccount] = useState({});
	const [loading, setLoading] = useState(false)

	const initialise = async () => {

		setLoading(true);

		try {
			const connex = new Connex({
				node: 'https://testnet.veblocks.net/',
				network: 'test'
			});

			const account = connex.thor.account(myAccountAddress);

			const info = await account.get();
			console.log("accInfo:", info);
			let status = connex.thor.status;
			console.log("status:", status);

			//const contractAccount = connex.thor.account(contractAddress);
			//const contractInfo = await contractAccount.get();
			//console.log("contractAccount:", contractAccount);

			setAccount(account);
			setContractInfo(contractInfo);
			setAccInfo(info);
		} catch (err) {
			console.error(err);
		}

		setLoading(false);
	}

	useEffect(() => {
		initialise();
	}, []);

	const handleWrite = () => {

		const acc = connex.thor.account(contractAddress);
		const method = acc.method(contractABI);
	}

	const handleRead = () => {
		const acc = connex.thor.account(contractAddress);
	}

	return (
		<div className="App">
			<h2>Account Info</h2>
			<div>{JSON.stringify(accInfo)}</div>

			<h2>Contract Info</h2>
			<div>{JSON.stringify(contractInfo)}</div>

			<h2>Write operation</h2>
			<h4>Requires transaction to be signed your using private key and VTHO availability.</h4>
			<input type="text" name="store" onChange={e => setName(e.target.value)} />

			<button onClick={handleWrite}>
				Set name
      		</button>

			<br />
			<br />

			<h2>Read operation</h2>
			<button onClick={handleRead}>
				Read
      		</button>
			<div>{result}</div>

			{loading &&
				<div>
					<img src={logo} className="App-logo" alt="logo" />
				</div>
			}
		</div>
	);
}

export default App;
