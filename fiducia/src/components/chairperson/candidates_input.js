import React, { Component } from 'react';
import Web3 from 'web3';
import { ABI, address } from '../config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      voterNames: Array.from({ length: this.props.noOfVoters }, () => ''),
    };
  }

  componentDidMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    try {
      // Check if Web3 provider is available from Metamask or similar extension
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request user permission to connect
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        const scontract = new web3.eth.Contract(ABI, address)
        this.setState({ scontract })
      } else {
        console.log('Please install MetaMask or use a compatible browser extension.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  }
  handleVoterNameChange = (event, index) => {
    const { voterNames } = this.state;
    voterNames[index] = event.target.value;
    this.setState({ voterNames });
  };
  
  render() {
    return (
      <div>
        <h2>Enter the candidate details</h2>
        {this.state.voterNames.map((name, index) => (
          <div key={index} className="container mb-3 flex">
            <h3>Voter {index + 1}</h3>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => this.handleVoterNameChange(e, index)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default App;