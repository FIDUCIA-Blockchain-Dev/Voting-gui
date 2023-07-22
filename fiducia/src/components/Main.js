import React, { Component } from 'react';
import Web3 from 'web3';
import Chairperson from './chairperson.js';
import Voter from './voter.js';
import {ABI,address} from './config.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      chairperson:'',
      status:-1,
      
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
        this.setState({scontract},()=>{
            this.chairperson_or_voter();
        });
      } else {
        console.log('Please install MetaMask or use a compatible browser extension.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  }

  async chairperson_or_voter(){
    const {scontract,account}= this.state;
    const chair = await scontract.methods.chairperson().call();
    this.setState({chairperson:chair});
    if(account==chair)
    {
      this.setState({status:0})
    }
    else
    {
      this.setState({status:1})
    }
  }
 
  render() {
    const {chairperson,account,status,dataArray} = this.state;
    
    return (
     <>
   
     {status==0 && <Chairperson />}
     {status==1 && <Voter />}
     </>
    );
  }
}

export default App;