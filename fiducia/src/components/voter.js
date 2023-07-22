import React, { Component } from 'react';
import Web3 from 'web3';
import Register from './voter/register.js';
import Vote from './voter/vote.js';
import Reveal from './voter/reveal.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      view:''
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
      } else {
        console.log('Please install MetaMask or use a compatible browser extension.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  }
  async register(){
    this.setState({view:'register'})
  }
  async vote(){
    this.setState({view:'vote'})
  }
  async reveal(){
    this.setState({view:'reveal'})
  }

  render() {
    const {view} = this.state;
   
    return (
      <div>
        
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
<div class="container-fluid">
  
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <button type="button" class="btn btn-success" onClick={()=>this.register()} style={{marginRight:'40px'}}>Register</button>
      </li>
      <li class="nav-item">
       <button type="button" class="btn btn-success" onClick={()=>this.vote()} style={{marginRight:'40px'}}>Vote</button>
      </li>
      <li class="nav-item">
       <button type="button" class="btn btn-success" onClick={()=>this.reveal()} style={{marginRight:'40px'}}>Reveal Winner</button>
      </li>
      
      
      
    </ul>
    
  </div>
</div>
</nav>
<h1>Hello, Voter</h1>
      <p>Your account: {this.state.account}</p>
      {view=='register' && <Register/>}
      {view=='vote' && <Vote />}
      {view=='reveal' && <Reveal/>}
    </div>
    );
  }
}

export default App;