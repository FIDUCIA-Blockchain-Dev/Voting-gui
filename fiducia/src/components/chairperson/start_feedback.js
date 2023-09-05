import React, { Component } from 'react';
import Web3 from 'web3';
import {ABI,address} from '../config_feedback.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      starttime:'',
      clicked:0,
      error:0,
      isstarted:false,
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
    this.setState({scontract});
   /* try
    {
       const isstarted1 = await scontract.methods.get_isstarted().call();
    this.setState({isstarted:isstarted1})
    
    }
    catch(error)
    {
      this.setState({error:1})
    }*/
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
    try
    {
      await scontract.methods.Start().send({from:account});
   // const starttime1 =  await scontract.methods.starttime().call();
    //this.setState({starttime:starttime1,clicked:1})
   
    }
    catch(error)
    {
      this.setState({error:1});
    }
    /*try
    {
       const isstarted1 = await scontract.methods.get_isstarted().call();
    this.setState({isstarted:isstarted1})
    
    }
    catch(error)
    {
      this.setState({error:1})
    }*/
   
   

  }

  render() {
    const {error,isstarted} = this.state;
    return (
      <div>
        <h1>START PAGE</h1>
        <p>Your account: {this.state.account}</p>
        

        
        <div className='container'>
        {error===1 && <div><div class="alert alert-danger alert-dismissible fade show" role="alert">
  You have rejected the transaction. Please try again
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div></div>}


 && <div> <button type="button" class="btn btn-success" onClick={()=>this.start()} style={{marginRight:'40px'}}>Start</button></div>
       
        
        </div>
      </div>
    );
  }
}

export default App;