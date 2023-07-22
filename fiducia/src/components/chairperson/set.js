import React, { Component } from 'react';
import Web3 from 'web3';
import { ABI, address } from '../config';
import Candidates_input from './candidates_input.js';
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
    const {scontract,account,no_of_voters,reg_time,vote_time,reveal_time} = this.state;
    await scontract.methods.set(no_of_voters,reg_time,vote_time,reveal_time).send({from:account});
    this.setState({submit_pressed:1});
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
    const {submit_pressed} = this.state

    if(submit_pressed==0)
    {
      return (
     
        <div>
          <h1>SET PAGE</h1>
          <p>Your account: {this.state.account}</p>
          <div className='container'>
            <form>
              <div class="container mb-3 flex">
                <label class="form-label">Number of voters</label>
                <input type="text" class="form-control" id="exampleTo" value={this.state.no_of_voters}
                  onChange={this.handle_no_of_voters_Change} />
              </div>
              <div class="container mb-3 flex">
                <label class="form-label">Register time</label>
                <input type="text" class="form-control" id="exampleTo" value={this.state.reg_time}
                  onChange={this.handle_reg_time_Change} />
              </div>
              <div class="container mb-3 flex">
                <label class="form-label">Voter time</label>
                <input type="text" class="form-control" id="exampleTo" value={this.state.vote_time}
                  onChange={this.handle_vote_time_Change} />
              </div>
              <div class="container mb-3 flex">
                <label class="form-label">Reveal the winner time</label>
                <input type="text" class="form-control" id="exampleTo" value={this.state.reveal_time}
                  onChange={this.handle_reveal_time_Change} />
              </div>
              <button type="button" class="btn btn-success" onClick={() => this.set()}>Submit</button>
            </form>
          </div>
  
        </div>
      );
    }
    else
    {
      return (
     
        <>
        <Candidates_input  noOfVoters={this.state.no_of_voters}/>
        </>
      );
    }

  }
}

export default App;