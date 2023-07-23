import React, { Component } from 'react';
import Web3 from 'web3';
import { ABI, address } from '../config';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      names_array: [],
      scontract: null, // Initialize scontract as null initially
    };
  }

  componentDidMount() {
    this.loadBlockchainData();
  }

  async get_names() {
    try {
      const { scontract } = this.state;
      if (!scontract) {
        console.error('Smart contract instance not available.');
        return;
      }
      const length = await scontract.methods.candidatescount().call();
      const namesArray = []
      for (let i = 0; i < length; i++) {
        const element = await scontract.methods.get_names(i).call();
        namesArray.push(element);
      }
      this.setState({ names_array: namesArray });
      console.log(this.state.names_array);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  }

  async loadBlockchainData() {
    try {
      // Check if Web3 provider is available from Metamask or similar extension
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request user permission to connect
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });

        const scontract = new web3.eth.Contract(ABI, address);
        this.setState({ scontract }, () => {
          // Callback function to ensure scontract is set before calling get_names()
          this.get_names();
        });
      } else {
        console.log('Please install MetaMask or use a compatible browser extension.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  }

  render() {
    return (
      <div>
        <h1>VOTE PAGE</h1>
        <p>Your account: {this.state.account}</p>
        {/* Display candidate names */}
        {this.state.names_array.map((name, index) => (
          <p key={index}>Candidate {index + 1}: {name}</p>
        ))}
      </div>
    );
  }
}

export default App;
