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
  async set() {
    this.setState({view:'set'})

  }
  async start() {
    this.setState({view:'start'})
  }
  async reset() {
    this.setState({view:'reset'})
  }
  async manage_time() {
    this.setState({view:'manage time'})
  }
  async start_feedback(){
    this.setState({view:'feedback'})
  }
  async questions_input_feedback(){
    this.setState({view:'questions_input'})
  }
  async get_answers_feedback(){
    this.setState({view:'get_answers'})
  }
  async reset_feedback(){
    this.setState({view:'reset_feedback'})
  }
  async Voting() 
  {
    this.setState({view:'Voting'})
  }

  async Feedback()
  {
    this.setState({view:'Feedback'})
  }
  async Home()
  {
    this.setState({view:'home'})
  }
  render() {
    const {view} = this.state;
  
    
    
      return (

      
        <div>
            
            <>  

                <nav class="navbar navbar-expand-lg  border-bottom border-2 border-secondary fs-5 ">
        <div class="container-fluid">
          <a class="navbar-brand mx-5 fs-4" href="#">Fiducia</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">HOME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              </li>

              <li class="nav-item ">
                <a class="nav-link" href="/StartFeedback">START FEEDBACK &nbsp;&nbsp;</a>
               
              </li>
              <li class="nav-item ">
                <a class="nav-link" href="/InputFeedback">QUESTION INPUT FEEDBACK &nbsp;&nbsp;</a>
               
              </li>
              <li class="nav-item ">
                <a class="nav-link" href="/AnswersFeedback">SEE ANSWERS &nbsp;&nbsp;</a>
               
              </li>
              <li class="nav-item ">
                <a class="nav-link" href="/ResetFeedback">RESET FEEDBACK FORM &nbsp;&nbsp;</a>
               
              </li>
              
              
              
            </ul>
            
          </div>
        </div>
      </nav>    
        </> 
      
        <div>{this.props.children}</div>
   
  
         
         
        </div>
       
      );
    
 
    
  }
}

export default App;