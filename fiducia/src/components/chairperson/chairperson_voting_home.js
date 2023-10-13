import React, { Component } from 'react';
import Web3 from 'web3';
import { ABI, address } from '../config';
import ChairVotingNavbar from './chairperson_VotingNavbar'
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
  async reset() {
    const {scontract,account} = this.state;
    try
    { this.setState({ispressed:0})
      await scontract.methods.reset().send({from:account});
      this.setState({ispressed:1})
    }
    catch(error)
    {
      this.setState({error:1})
    }
   
  }
  async Home()
  {
    this.setState({view:'home'})
  }
  async Voting() 
  {
    this.setState({view:'Voting'})
  }

  async Feedback()
  {
    this.setState({view:'Feedback'})
  }
  render() {
    const {error,ispressed,view} = this.state;
    return (
      <ChairVotingNavbar>
      <div>
    
        <>
 
      <h1 class="m-5">Welcome Chairperson- Voting subsystem</h1><br/> <br/> <br/></>
      
      </div>
      </ChairVotingNavbar>
    );
  }
}

export default App;