import React, { useState, useEffect } from 'react';
import './App.css';
import Connex from '@vechain/connex'

const myAccountAddress = "0xa1500dCBCdeAE6bC1C8B699606d41f10A2C9897E";

const toAccountAddress = "0xa8535f57f3642EBEAe04Bc9864A612AB5Be874FC";

const contractAddress = "";

const contractABI = "";

function App() {

  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [accInfo, setAccInfo] = useState({});
  const [connex, setConnex] = useState(null);
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false)

  const initialise = async () => {

    const connex = new Connex({
      node: 'https://testnet.veblocks.net/',
      network: 'test'
    });

    const account = connex.thor.account(myAccountAddress);

    const info = await account.get();
    console.log("accInfo:", info);

    setAccount(account);
    setAccInfo(info);
  }

  useEffect(() => {
    initialise();
  });

  const handleWrite = () => {

    const acc = connex.thor.account(contractAddress);
    const method = acc.method(contractABI);

  }

  const handleRead = () => {
    const acc = connex.thor.account(contractAddress);
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <p>{JSON.stringify(accInfo)}</p>

      <h2>Write operation: Requires transaction to be signed your using private key and VTHO availability.</h2>
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
      <p>{result}</p>
    </div>
  );
}

export default App;
