import React, { Component } from 'react';
import Web3 from 'web3';
import VoterHome from './voter/voter_home.js'
import Register from './voter/register.js';
import Vote from './voter/vote.js';
import Reveal from './voter/reveal.js';
import Register_Feedback from './voter/register_feedback.js'
import Answer_Feedback from './voter/answer_feedback.js'
import VotingHome from './voter/voter_voting_home.js'
import FeedbackHome from './voter/voter_feedback_home.js'
import {BrowserRouter as Br,Route,Routes} from 'react-router-dom';
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


  render() {
    
   
    return (
     <>
     <Br>
     <Routes>
     <Route  exact path='/' element={<VoterHome/>}  />
     <Route  exact path='/VoterRegister' element={<Register/>}  />
     <Route  exact path='/VoterVote' element={<Vote/>}  />
     <Route  exact path='/VoterWinner' element={<Reveal/>}  />
     <Route  exact path='/VoterFeedbackRegister' element={<Register_Feedback/>}  />
     <Route  exact path='/VoterGiveFeedback' element={<Answer_Feedback/>}  />
     <Route  exact path='/VoterHome' element={<VotingHome/>}  />
     <Route  exact path='/VoterFeedbackHome' element={<FeedbackHome/>}  />
     </Routes>
     </Br>
     
     </>
    );
  }
}

export default App;