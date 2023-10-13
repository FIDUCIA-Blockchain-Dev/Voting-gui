import React, { Component } from 'react';
import Web3 from 'web3';
import ChairFeedbackNav from './chairperson_FeedbackNavbar'
import {ABI,address} from '../config_feedback.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      no_of_questions:0,
      type_of_answers:[],
      pressed_form:0,
      question_array:[],
      answer_array:[],
     
      
      
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
        this.setState({web3});
        await window.ethereum.enable(); // Request user permission to connect
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        const scontract = new web3.eth.Contract(ABI,address);
        this.setState({scontract});
        
      } else {
        console.log('Please install MetaMask or use a compatible browser extension.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  }

  handleNoQuestionsChange = (event) => {
    
    //const {no_of_questions} = this.state;
    this.setState({no_of_questions:event.target.value})
 }
  handleTypeQuestionsChange = (event,index) =>{
    const {type_of_answers} = this.state;
    let aq = type_of_answers
    aq[index] = event.target.value

    this.setState({type_of_answers:aq})
    //console.log("no of questions"+this.state.no_of_questions)
 }
 handleQuestions = (event,index) =>{
  //this.setState({type_of_answers:event.target.value})
  const {question_array} = this.state;
  question_array[index] = event.target.value;
  this.setState(question_array);
}
handleAnswers = (event,index,innerIndex) => {
  const {answer_array}= this.state;
  answer_array[index][innerIndex] = event.target.value;
  this.setState(answer_array);
}
 async inputBasic() {
  this.setState({pressed_form:1})
  // pressed_form 1 tells input basic done
  this.setState({question_array:Array.from({ length: this.state.no_of_questions }, () => '')})
 }
 async inputQuestions(){
  this.setState({ pressed_form: 2 });
  // pressed form 2 tells that input of questions is done
  const { scontract, type_of_answers, web3 } = this.state;
 // const promises = [];

  for (let i = 0; i < this.state.no_of_questions; i++) {
    //const transaction = scontract.methods.questions_input(this.state.question_array[i]);
    /*const transactionObject = {
      from: this.state.account,
      gas: 200000, // Adjust the gas limit as needed
    };*/

    // Push each transaction promise to the promises array
   // promises.push(transaction.send(transactionObject));
   
  }

  this.setState({
    answer_array: Array.from({ length: this.state.no_of_questions }, () =>
      Array.from({ length: 4 }, () => ''),
    ),
  });

await scontract.methods.questions_input(this.state.question_array,this.state.no_of_questions,this.state.type_of_answers).send({from:this.state.account});
// console
for(let i=0;i<this.state.no_of_questions;i++)
{
  console.log("type for q1:"+(await scontract.methods.get_type(i).call()));
}
 }
 async inputAnswers(){
  const {scontract,answer_array,type_of_answers} = this.state;
  const promises = []
  for(let i=0;i<this.state.no_of_questions;i++)
  { const ans_array = [];
     for(let j=0;j<4;j++)
     {
        ans_array.push(answer_array[i][j])
     }
     console.log("answer array:"+ans_array);
     
     const transaction =  scontract.methods.answers_input(i,ans_array);
     const transactionObject = {
      from: this.state.account,
      gas: 200000, // Adjust the gas limit as needed
    };

    // Push each transaction promise to the promises array
    promises.push(transaction.send(transactionObject));
    console.log("retreving from smart contract:"+await scontract.methods.get_options(i).call());
    
  }
  try {
    // Use Promise.all() to send all transactions asynchronously
    await Promise.all(promises);
    console.log('All transactions have been sent.');
  } catch (error) {
    console.error('Error sending transactions:', error);
  }
  // console
  
  
 }
 
  render() {
   
    const options = [ 'radiobutton', 'text field'];
    const {pressed_form,answer_array,type_of_answers} = this.state;
    return (
      <ChairFeedbackNav>
      <>


   {pressed_form===0 && <>      <form>
      <div class="mb-3 flex m-5 col-5">
                        <label class="form-label">Enter no of questions </label>
                        <input type="text" class="form-control border-black border-2 rounded-pill form-control-lg" id="exampleTo"value={this.state.no_of_questions}
            onChange={this.handleNoQuestionsChange} />
                    </div>
                    
                    
                    <button  type="button"class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark m-5" onClick={() => this.inputBasic()}>Submit</button>
                    
                    
      </form></>}
      {pressed_form===1 && <>
        <div class="mb-3 flex m-5 col-5">
        {this.state.question_array.map((name, index) => (
          <div key={index} className="container mb-3 flex">
            <h3>Question {index + 1}</h3>
            <input
              type="text"
              className="form-control border-black border-2 rounded-pill form-control-lg"
              value={name}
              onChange={(e) => this.handleQuestions(e, index)}
            />
             <div class="container mb-3">
              <br/>
                        <label class="form-label"><h6>Enter type of answers </h6></label>
                        <select class="form-select form-select-lg mb-3" aria-label="Large select example" onChange={(e) =>this.handleTypeQuestionsChange(e,index)}>
 
 <option>Please choose one option</option>
 {options.map((option, innerIndex) => {
     return <option key={innerIndex} >
         {option}
     </option>
 })}
</select>
                    </div>
          </div>
        ))}
        
        <button  type="button"class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark m-5" onClick={() => this.inputQuestions()}>Submit</button>
        
        
      </div></>}
      {pressed_form === 2  &&  (
  <div class="d-grid gap-2 col-3 mx-5 "> 
    {answer_array.map((innerArray, index) => (
      <div key={index} className='container mb-3 flex'>
        
        {type_of_answers[index] === 'radiobutton' && (
          
  <div>
    <h3>Question {index + 1}:{this.state.question_array[index]}</h3>
    {innerArray.map((value, innerIndex) => (
      <div key={innerIndex} className="container mb-3 flex">
        <h5>Option {innerIndex + 1}</h5>
        <input
          type="text"
          className="form-control border-black border-2 rounded-pill form-control-lg"
          value={value}
          onChange={(e) => this.handleAnswers(e, index, innerIndex)}
        />
      </div>
    ))}
  </div>
)}
   

      </div>
    ))}
      
        <button  type="button"class="btn border-black border-2 rounded-pill btn-lg btn-outline-dark" onClick={() => this.inputAnswers()}>Submit</button>
        
        </div>
)}
    </>
    </ChairFeedbackNav>
    );
  }
}

export default App;