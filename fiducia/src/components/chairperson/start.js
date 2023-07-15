import React, { Component } from 'react';
import Web3 from 'web3';
import {ABI,address} from '../config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      starttime:'',
      clicked:0
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
        const scontract = new web3.eth.Contract(ABI,address)
    this.setState({scontract})
      } else {
        console.log('Please install MetaMask or use a compatible browser extension.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
    
  }
  async start()
  {
    const {scontract,account} = this.state;
   await scontract.methods.start().send({from:account});
    const starttime1 =  await scontract.methods.starttime().call();
    this.setState({starttime:starttime1,clicked:1})

  }

  render() {
    const {starttime} = this.state;
    return (
      <div>
        <h1>START PAGE</h1>
        <p>Your account: {this.state.account}</p>
        

        
        <div className='container'>
        <button type="button" class="btn btn-success" onClick={()=>this.start()} style={{marginRight:'40px'}}>Start</button>
        
        </div>
      </div>
    );
  }
}

export default App;