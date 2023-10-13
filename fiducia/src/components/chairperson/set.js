import React, { Component } from 'react';
import Web3 from 'web3';
import { ABI, address } from '../config';
import Candidates_input from './candidates_input.js';
import ChairVotingNavbar from './chairperson_VotingNavbar'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      no_of_voters: 0,
      reg_time: '',
      vote_time: '',
      reveal_time: '',
      submit_pressed:0,
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
  async set() {
    const {scontract,account,no_of_voters} = this.state;
    try
    {
      await scontract.methods.set(no_of_voters).send({from:account});
    this.setState({submit_pressed:1});
    }
    catch(error)
    {
      this.setState({error:1})
    }
    
  }
  handle_no_of_voters_Change = (event) => {
    this.setState({ no_of_voters: event.target.value })
  }
  handle_reg_time_Change = (event) => {
    this.setState({ reg_time: event.target.value })
  }
  handle_vote_time_Change = (event) => {
    this.setState({ vote_time: event.target.value })
  }
  handle_reveal_time_Change = (event) => {
    this.setState({ reveal_time: event.target.value })
  }
  render() {
    const {submit_pressed,error} = this.state
   
    if(submit_pressed===0)
    {
      return (
        <ChairVotingNavbar>
        <div>
          

          <div className='container'>
          {error===1 && <div><div class="alert alert-danger alert-dismissible fade show" role="alert">
  You have rejected the transaction. Please try again
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div></div>}
            <form>
              <div class="mb-3 flex m-5 col-5">
                <label class="form-label">Number of Candidates</label>
                <input type="text" class="form-control border-black border-2 rounded-pill form-control-lg" id="exampleTo" value={this.state.no_of_voters}
                  onChange={this.handle_no_of_voters_Change} />
              </div>
           
              <button type="button" class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark m-5" onClick={() => this.set()}>Submit</button>
            </form>
          </div>
          
        </div>
        </ChairVotingNavbar>
      );
    }
    else
    {
      return (
        <ChairVotingNavbar>
        <>
        <Candidates_input  noOfVoters={this.state.no_of_voters} />
        </>
         </ChairVotingNavbar>
      );
    }

  }
}

export default App;