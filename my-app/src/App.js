import logo from './logo.svg';
import './App.css';

// import the web3js module
import {Web3} from "web3";
import { useState, useEffect } from 'react';


const ADDRESS ="0x50f6293f0cC9099FCd472d39343Bc5f8cABB304D"
const ABI =[{"inputs":[{"internalType":"uint256","name":"startingPoint","type":"uint256"},{"internalType":"string","name":"startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getnumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}]
function App() {
  const [counter, setCounter] = useState("none");
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    // Initialize Web3 and contract when the component mounts
    const initWeb3 = async () => {
      // Check if MetaMask or another Web3 provider is available
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable(); // Prompt user for account connections
          const contractInstance = new web3Instance.eth.Contract(ABI, ADDRESS);
          
          setWeb3(web3Instance);
          setContract(contractInstance);
        } catch (error) {
          console.error("User denied account access or other error", error);
        }
      } else {
        console.error("No Web3 provider found. Please install MetaMask.");
      }
    };

    initWeb3();
  }, []);

  const getCounter = async () => {
    if (contract) {
      try {
        // Fetch the counter from the smart contract
        const result = await contract.methods.getNumber().call({ gas: 100000 });
        setCounter(result.toString());
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    } else {
      console.error("Contract not loaded. Make sure Web3 and contract are initialized.");
    }
  };

  const increaseCounter = async () => {
    if (contract && web3) {
      try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.increaseNumber().send({ from: accounts[0], gas: 100000 });
        getCounter(); // Refresh the counter value after incrementing
      } catch (error) {
        console.error("Error increasing counter:", error);
      }
    }
  };

  const decreaseCounter = async () => {
    if (contract && web3) {
      try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.decreaseNumber().send({ from: accounts[0], gas: 100000 });
        getCounter(); // Refresh the counter value after decrementing
      } catch (error) {
        console.error("Error decreasing counter:", error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getCounter}>Get Current Counter</button>
        <hr />
        <button onClick={increaseCounter}>Increase Counter</button>
        <hr />
        <button onClick={decreaseCounter}>Decrease Counter</button>
        <hr />
        <p>Counter: {counter}</p>
      </header>
    </div>
  );
}

export default App;
