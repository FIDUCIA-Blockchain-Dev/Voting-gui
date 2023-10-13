import React, { Component } from 'react';
import Web3 from 'web3';

import ChairHome from './chairperson/chairperson_home.js'
import ChairVotingHome from './chairperson/chairperson_voting_home.js'
import ChairFeedbackHome from './chairperson/chairpeson_feedback_home.js'
import {BrowserRouter as Br,Route,Routes} from 'react-router-dom';
import Start from './chairperson/start.js'
import Reset from './chairperson/reset.js'
import Set from './chairperson/set.js'
import Manage from './chairperson/manage_time.js'
import StartFeedback from './chairperson/start_feedback.js'
import ResetFeedback from './chairperson/reset_feedback.js'
import AnswersFeedback from './chairperson/getAnswers_feedback.js'
import InputFeedback from './chairperson/questions_input_feedback.js'
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


        <>
        
        <Br>
       
        <Routes>
        <Route  exact path='/' element={<ChairHome/>}  />
        <Route  exact path='/Voting' element={<ChairVotingHome/>}  />
        <Route  exact path='/Feedback' element={<ChairFeedbackHome/>}  /> 
        <Route  exact path='/VotingSet' element={<Set/>}  /> 
        <Route  exact path='/VotingStart' element={<Start/>}  /> 
        <Route  exact path='/VotingReset' element={<Reset/>}  /> 
        <Route  exact path='/VotingTime' element={<Manage/>}  /> 
        <Route  exact path='/StartFeedback' element={<StartFeedback/>}  /> 
        <Route  exact path='/InputFeedback' element={<InputFeedback/>}  /> 
        <Route  exact path='/AnswersFeedback' element={<AnswersFeedback/>}  /> 
        <Route  exact path='/ResetFeedback' element={<ResetFeedback/>}  /> 
        </Routes>
        </Br>
        
        </>
       );
    
 
    
  }
}

export default App;

/*   

 {view==='set' && <Set />}
        {view==='start' && <Start/>}
        {view==='reset' && <Reset/>}
        {view==='manage time' && <Manage_time/>}
        {view==='feedback' && <Start_Feedback/>}
        {view==='questions_input' && <Questions_Feedback/>}
        {view==='get_answers' && <Get_Answers/>}
        {view==='reset_feedback' && <Reset_Feedback/>}
            {view==='Voting' && <VotingHome/>}
        {view==='Feedback' && <FeedbackHome/> }



*/