import React, { Component } from 'react';
import Web3 from 'web3';
import { ABI, address } from '../config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      winners_length: 0,
      winners: [],
      error:0,
    };

    // Bind the functions to the current instance of App
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
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
        const scontract = new web3.eth.Contract(ABI, address);
        try
        {
          await scontract.methods.reveal_winner().send({from:this.state.account});

        }
        catch(Error)
        {
          this.setState({error:1})
        } 
        
        // Get winners length
        const winners_length = await scontract.methods.get_winners_length().call();
        this.setState({ winners_length });

        // Get winners data
        const winners = [];
        for (let i = 0; i < winners_length; i++) {
          const winnerName = await scontract.methods.get_winners(i).call();
          winners.push(winnerName);
        }
        this.setState({ winners });
      } else {
        console.log('Please install MetaMask or use a compatible browser extension.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  }

  render() {
    const { account, winners_length, winners ,error} = this.state;
    return (
      <div>
        <h1>REVEAL WINNER PAGE</h1>
        <p>Your account: {account}</p>
        {error===1 && <div><div class="alert alert-danger alert-dismissible fade show" role="alert">
  You have rejected the transaction. Please try again
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div></div>}
        <ul>
          {winners.map((winner, index) => (
            <li key={index}>{winner}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
