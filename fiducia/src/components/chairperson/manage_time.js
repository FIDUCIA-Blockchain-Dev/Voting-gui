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
    try
    {
      await scontract.methods.start_register().send({from:this.state.account});
    }
    catch(error)
    {
      this.setState({error:1})
    }
    
 }
 async stop_register() {
    const {scontract} = this.state;
    try
    {
      await scontract.methods.stop_register().send({from:this.state.account});
    }
    catch(error)
    {
      this.setState({error:1})
    }
    
 }
 async start_voting() {
    const {scontract} = this.state;
    try
    {
      await scontract.methods.start_voting().send({from:this.state.account});
    }
    catch(error)
    {
      this.setState({error:1})
    }
   
 }
 async stop_voting() {
    const {scontract} = this.state;
    try
    {
      await scontract.methods.stop_voting().send({from:this.state.account});
    }
    catch(error)
    {
      this.setState({error:1})
    }
   
 }
 async start_reveal() {
    const {scontract} = this.state;
    try
    {
      await scontract.methods.start_reveal().send({from:this.state.account});
    }
    catch(error)
    {
      this.setState({error:1})
    }
    
 }
  render() {
    const {error} = this.state;
    return (
      <ChairVotingNavbar>
      <div>
        
        <div className='container'>
        {error===1 && <div><div class="alert alert-danger alert-dismissible fade show" role="alert">
  You have rejected the transaction. Please try again
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div></div>}
<br/>
<div class="d-grid gap-2 col-3 mx-5 ">
                <button type="button" class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark" onClick={()=>this.start_register() } style={{marginRight:'40px'}}>Start Registration process</button>
                <br/>
                
                <button type="button" class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark" onClick={()=>this.stop_register()} style={{marginRight:'40px'}} >Stop Registration process</button>
                <br/>
               
                <button type="button" class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark" onClick={()=>this.start_voting()} style={{marginRight:'40px'}} >Start Voting process</button>
                <br/>
                <button type="button" class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark" onClick={()=>this.stop_voting()} style={{marginRight:'40px'}}>Stop Voting process</button>
                <br/>
                <button type="button" class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark" onClick={()=>this.start_reveal()} style={{marginRight:'40px'}}>Start Revealing the winners</button>
                </div>
            
        </div>
      </div>
      </ChairVotingNavbar>
    );
  }
}

export default App;