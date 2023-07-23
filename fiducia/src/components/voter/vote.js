import React, { Component } from 'react';
import Web3 from 'web3';
import { ABI, address } from '../config';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      names_array: [],
      scontract: null,
      selectedName:'', // Initialize scontract as null initially
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
  handleNameChange = (event) => {
    const selectedIndex = parseInt(event.target.value, 10); // Convert the value to an integer
    this.setState({ selectedName: selectedIndex });
  };
  async selectCandidate() {
    console.log(this.state.selectedName);
    const {scontract,selectedName} = this.state;
    await scontract.methods.voting_process(selectedName).send({from:this.state.account});
  }
  render() {
    const { selectedName } = this.state;
    return (
      <div>
      <h1>VOTE PAGE</h1>
      <p>Your account: {this.state.account}</p>
      {/* Display candidate names */}
      <div className='container'>
        {this.state.names_array.map((name, index) => (
          <div key={index}>
            <input
              type="radio"
              name="selectedName" // Set the same name for all radio buttons to create a radio group
              value={index}
              id={name}
              checked={selectedName === index}
              onChange={this.handleNameChange}
            />
            <label htmlFor={name}>{name}</label>
          </div>
        ))}
          <button type="button" class="btn btn-success" onClick={() => this.selectCandidate()}>Vote</button>
      </div>
    </div>
    );
  }
}

export default App;
