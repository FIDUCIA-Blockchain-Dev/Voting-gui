import React, { Component } from 'react';
import Web3 from 'web3';
import Reset from './chairperson/reset.js';
import Set from './chairperson/set.js';
import Start from './chairperson/start.js';

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
  async set() {
    this.setState({view:'set'})

  }
  async start() {
    this.setState({view:'start'})
  }
  async reset() {
    this.setState({view:'reset'})
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
          <button type="button" class="btn btn-success" onClick={()=>this.set()} style={{marginRight:'40px'}}>Set</button>
        </li>
        <li class="nav-item">
         <button type="button" class="btn btn-success" onClick={()=>this.start()} style={{marginRight:'40px'}}>Start</button>
        </li>
        <li class="nav-item">
         <button type="button" class="btn btn-success" onClick={()=>this.reset()} style={{marginRight:'40px'}}>Reset</button>
        </li>
        
        
        
      </ul>
      
    </div>
  </div>
</nav>
<h1>Hello, Chairperson</h1>
        <p>Your account: {this.state.account}</p>
        {view=='set' && <Set/>}
        {view=='start' && <Start/>}
        {view=='reset' && <Reset/>}
      </div>
    );
  }
}

export default App;