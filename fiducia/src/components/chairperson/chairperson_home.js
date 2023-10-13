import React, { Component } from 'react';
import Web3 from 'web3';

import {BrowserRouter as Br,Route,Routes} from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      view:'home'
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

  render() {
  
  
    
    
      return (

      
        <div>
            
<>
  
        <br/>
        <h1 class="m-5">Welcome Chairperson 👋🏼</h1><br/> <br/> <br/>
       
  
  
        <h2 class="mx-5">Choose the function:</h2>
        <br/>
  
        
         
     
          <div class="d-grid gap-2 col-3 mx-5 ">
            <a href="/Voting"><button class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark"   type="button">Voting Application</button> <br/></a>
            <a href="/Feedback"><button class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark" type="button">See Feedback</button></a>
          </div></> 
      
  
   
  
         
         
        </div>
       
      );
    
 
    
  }
}

export default App;