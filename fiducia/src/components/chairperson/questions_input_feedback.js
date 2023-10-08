import React, { Component } from 'react';
import Web3 from 'web3';

import {ABI,address} from '../config_feedback.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      no_of_questions:0,
      type_of_answers:'',
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
  handleTypeQuestionsChange = (event) =>{
    this.setState({type_of_answers:event.target.value})
    console.log("no of questions"+this.state.no_of_questions)
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
  this.setState({pressed_form:2})
  // pressed form 2 tells that input of questions done
  const {scontract,type_of_answers} = this.state;
  for(let i=0;i<this.state.no_of_questions;i++)
  { await scontract.methods.questions_input(this.state.question_array[i]).send({from:this.state.account});
    //console.log(this.state.question_array[i]);
  }
  this.setState({answer_array:Array.from({ length: this.state.no_of_questions }, () =>
  Array.from({ length: 4 }, () => '')
)})
if(type_of_answers==='text field')
{
  const arr = ['-1','-1','-1','-1']
  for(let i=0;i<this.state.no_of_questions;i++)
  {
    await scontract.methods.answers_input(i,arr,this.state.type_of_answers).send({from:this.state.account});
  }
  
}
 }
 async inputAnswers(){
  const {scontract,answer_array,type_of_answers} = this.state;
  for(let i=0;i<this.state.no_of_questions;i++)
  { const ans_array = [];
     for(let j=0;j<4;j++)
     {
        ans_array.push(answer_array[i][j])
     }
     console.log("answer array:"+ans_array);
     await scontract.methods.answers_input(i,ans_array,type_of_answers).send({from:this.state.account});
    console.log("retreving from smart contract:"+await scontract.methods.get_options(i).call());
    
  }
  
 }
 
  render() {
   
    const options = ['checkbox', 'radiobutton', 'text field'];
    const {pressed_form,answer_array,type_of_answers} = this.state;
    return (
      <>

  
   {pressed_form===0 && <>      <form>
      <div class="container mb-3">
                        <label class="form-label">Enter no of questions </label>
                        <input type="text" class="form-control" id="exampleTo"value={this.state.no_of_questions}
            onChange={this.handleNoQuestionsChange} />
                    </div>
                    <div class="container mb-3">
                        <label class="form-label">Enter type of answers </label>
                        <select class="form-select form-select-lg mb-3" aria-label="Large select example" onChange={this.handleTypeQuestionsChange}>
 
 <option>Please choose one option</option>
 {options.map((option, index) => {
     return <option key={index} >
         {option}
     </option>
 })}
</select>
                    </div>
                    <div className='container mb-3'>
                    <button  type="button"class="btn btn-success" onClick={() => this.inputBasic()}>Submit</button>
                    </div>
                    
      </form></>}
      {pressed_form===1 && <>
      
        {this.state.question_array.map((name, index) => (
          <div key={index} className="container mb-3 flex">
            <h3>Question {index + 1}</h3>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => this.handleQuestions(e, index)}
            />
             
          </div>
        ))}
        <div className='container mb-3 flex'>
        <button  type="button"class="btn btn-success" onClick={() => this.inputQuestions()}>Submit</button>
        </div>
        
      </>}
      {pressed_form === 2 && type_of_answers !=='text field' &&  (
  <>
    {answer_array.map((innerArray, index) => (
      <div key={index} className='container mb-3 flex'>
        <h3>Question {index + 1}</h3>
        {innerArray.map((value, innerIndex) => (
          <div key={innerIndex} className='container mb-3 flex'>
            <h3>Answer {innerIndex}</h3>
            <input
            type="text"
            className="form-control"
              value={value}
              onChange={(e) => this.handleAnswers(e, index, innerIndex)}
            />
          </div>
        ))}
      </div>
    ))}
      <div className='container mb-3 flex'>
        <button  type="button"class="btn btn-success" onClick={() => this.inputAnswers()}>Submit</button>
        </div>
  </>
)}
    </>
    );
  }
}

export default App;