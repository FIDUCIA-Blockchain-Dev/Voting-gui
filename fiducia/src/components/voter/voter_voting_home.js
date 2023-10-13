import React, { Component } from 'react';
import Web3 from 'web3';
import { ABI, address } from '../config';
import VoterVotingNavbar from './voter_voting_navbar'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      error:0,
      ispressed:0,
      view:'Voting'
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

  render() {
    
    return (
      <VoterVotingNavbar>
      <div>
    
        <>
 
      <h1 class="m-5">Welcome Voter- Voting subsystem</h1><br/> <br/> <br/></>
      
      </div>
      </VoterVotingNavbar>
    );
  }
}

export default App;