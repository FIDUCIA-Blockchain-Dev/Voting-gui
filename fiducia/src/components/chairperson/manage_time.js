import React, { Component } from 'react';
import Web3 from 'web3';
import { ABI, address } from '../config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: ''
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
 async start_register() {
    const {scontract} = this.state;
    await scontract.methods.start_register().send({from:this.state.account});
 }
 async stop_register() {
    const {scontract} = this.state;
    await scontract.methods.stop_register().send({from:this.state.account});
 }
 async start_voting() {
    const {scontract} = this.state;
    await scontract.methods.start_voting().send({from:this.state.account});
 }
 async stop_voting() {
    const {scontract} = this.state;
    await scontract.methods.stop_voting().send({from:this.state.account});
 }
 async start_reveal() {
    const {scontract} = this.state;
    await scontract.methods.start_reveal().send({from:this.state.account});
 }
  render() {
    return (
      <div>
        <h3>Manage time page</h3>
        <div className='container'>
            
                
                <button type="button" class="btn btn-success" onClick={()=>this.start_register() } style={{marginRight:'40px'}}>Start Registration process</button>
                
                
                <button type="button" class="btn btn-success" onClick={()=>this.stop_register()} style={{marginRight:'40px'}} >Stop Registration process</button>
               
               
                <button type="button" class="btn btn-success" onClick={()=>this.start_voting()} style={{marginRight:'40px'}} >Start Voting process</button>
                
                <button type="button" class="btn btn-success" onClick={()=>this.stop_voting()} style={{marginRight:'40px'}}>Stop Voting process</button>
                
                <button type="button" class="btn btn-success" onClick={()=>this.start_reveal()} style={{marginRight:'40px'}}>Start Revealing the winners</button>
                
            
        </div>
      </div>
    );
  }
}

export default App;