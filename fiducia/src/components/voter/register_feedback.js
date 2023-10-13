import React, { Component } from 'react';
import Web3 from 'web3';
import VoterFeedbackNavbar from './voter_feedback_navbar'
import {ABI,address} from '../config_feedback.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      
     
      
      
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
        const scontract = new web3.eth.Contract(ABI,address);
        this.setState({scontract});
        
      } else {
        console.log('Please install MetaMask or use a compatible browser extension.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  }
  async register(){
    const {scontract,account} = this.state;
    await scontract.methods.register().send({from:account});
  }

 
  render() {
   

    return (
      <VoterFeedbackNavbar>
      <>
      <br/>
      <div class="d-grid gap-2 col-3 mx-5 "> <button type="button" class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark" onClick={()=>this.register()} >Register</button></div>
    
    </>
    </VoterFeedbackNavbar>
    );
  }
}

export default App;