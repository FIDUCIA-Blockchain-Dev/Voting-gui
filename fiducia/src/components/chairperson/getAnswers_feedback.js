import React, { Component } from 'react';
import Web3 from 'web3';

import { ABI, address } from '../config_feedback.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      no_of_q: 0,
      questions_array: [],
      type_of_ans: '',
      option_array: [],
      isReset:false,
      selectedOptions: [],
      selectedRadioOptions: [],
      textResponses: [],
      answersArray:[],
      countAnswerArray:[]
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

        // Request user permission to connect
        await window.ethereum.enable();

        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        const scontract = new web3.eth.Contract(ABI, address);
        this.setState({ scontract }, async () => {
          // First, get the number of questions
          /*await this.get_isReset();
          if(this.state.isReset===true)
          {
            await this.reset();
          }*/
          await this.no_of_questions();
          // Then, fetch the questions
          await this.questions();

          await this.type_of_answers();
            await this.options();
            await this.get_answers();
            if(this.state.type_of_ans!=='text field')
            {
              await this.determineCountAnswers();
            }
           
           
            console.log("no of questions:"+this.state.no_of_q);
            console.log("questions:"+JSON.stringify(this.state.questions_array));
          console.log('type of answers:' + this.state.type_of_ans);
          console.log('option array:' + JSON.stringify(this.state.option_array));
        });
      } else {
        console.log('Please install MetaMask or use a compatible browser extension.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  }
  
  async no_of_questions() {
    const { scontract } = this.state;
    const a = await scontract.methods.no_of_q().call();
    this.setState({ no_of_q: a });
    console.log("no of questions:"+a);
  }

  async questions() {
    const { scontract, no_of_q } = this.state;
    const q = [];
    for (let i = 0; i < Number(no_of_q); i++) {
      const b = await scontract.methods.get_Questions(i).call();
      q.push(b);
    }
    this.setState({ questions_array: q });
  }

  async type_of_answers() {
    const { scontract } = this.state;
    const result = await scontract.methods.get_type(0).call();
    this.setState({ type_of_ans: result.toString() });
  }

  async options() {
    // Your options function code here
    const {scontract} = this.state;
    let d = Array.from({ length: Number(this.state.no_of_q) }, () =>
    Array.from({ length: 4 }, () => '')
  )
    for(let i=0;i<Number(this.state.no_of_q);i++)
    { let c = []
      c = await scontract.methods.get_options(i).call();
      
      for(let j=0;j<4;j++)
      {
        d[i][j] = c[j];
      }
    }
    this.setState({option_array:d})
  }
  // Inside your App component class
  async determineCountAnswers() {
    const { option_array, no_of_q, answersArray } = this.state;
    let q = [];
  
    for (let i = 0; i < no_of_q; i++) {
      let row = []; // Initialize a row for the 2D array
      for (let j = 0; j < 4; j++) {
        let ele = option_array[i][j];
        const count = answersArray.flat().filter((element) => element === ele).length;
        console.log(`count of ${ele}: ${count}`);
        row.push(count); // Add the count to the current row
      }
      q.push(row); // Add the row to the 2D array
    }
  
    this.setState({ countAnswerArray: q });
    console.log(q);
  }
  
  
  
  
  
  
  

// Call this function after you have fetched option_array and answersArray


  async get_answers() {
    const { scontract, no_of_q } = this.state;
    let arr = [];
  
    for (let i = 0; i < no_of_q; i++) {
      let a = await scontract.methods.getAnswersForQuestion(i).call();
      console.log("answers for question " + (i + 1) + ": " + a);
      
      let questionAnswers = [];
      for (let j = 0; j < a.length; j++) {
        if (a[j] !== undefined) {
          questionAnswers.push(a[j]);
          console.log("answer " + j + " for question " + i + ": " + a[j]);
        }
      }
      
      arr.push(questionAnswers);
    }
  
    this.setState({ answersArray: arr });
    console.log(arr);
  }


  async get_isReset()
  {
    const {scontract} = this.state;
    let isReset1 = await scontract.methods.get_isReset().call();
    this.setState({isReset:isReset1})
  }
  async reset()
  { const {scontract} = this.state;
    this.setState({
      
      no_of_q: 0,
      questions_array: [],
      type_of_ans: '',
      option_array: [],
    });
    await scontract.methods.set_isReset(false).send({from:this.state.account});
  }


  render() {
    const { questions_array, option_array,type_of_ans,countAnswerArray,answersArray} = this.state;
    return (
      <>
        
      
      {option_array.length > 0 && type_of_ans === 'checkbox' && (
              <div className='container'>
              {questions_array.map((question, index) => (
                <div key={index}>
                  <h5>{index + 1}: {question}</h5>
      
                  {/* Render options for the current question */}
                  <div >
                    {option_array[index].map((option, innerIndex) => (
                      <div key={innerIndex} className="container" >
                       
                        <p>{option}</p>
                        {countAnswerArray[index] && countAnswerArray[index][innerIndex] !== undefined ? (
                <p>Count: {countAnswerArray[index][innerIndex]}</p>
              ) : (
                <p>Count: N/A</p> // Handle the case when the count is undefined
              )}
                        
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
            </div>
           
        )}
        {option_array.length > 0 && type_of_ans === 'radiobutton' && (
              <div className='container'>
               {questions_array.map((question, index) => (
                <div key={index}>
                  <h5>{index + 1}: {question}</h5>
      
                  {/* Render options for the current question */}
                  <div >
                    {option_array[index].map((option, innerIndex) => (
                      <div key={innerIndex} className="container" >
                       
                        <p>{option}</p>
                        {countAnswerArray[index] && countAnswerArray[index][innerIndex] !== undefined ? (
                <p>Count: {countAnswerArray[index][innerIndex]}</p>
              ) : (
                <p>Count: N/A</p> // Handle the case when the count is undefined
              )}
                        
                      </div>
                    ))}
                  </div>
                </div>
              ))}
               
            </div>
           
        )}
        {option_array.length > 0 && type_of_ans === 'text field' && (
              <div className='container'>
             {questions_array.map((question, index) => (
  <div key={index}>
    <h5>{index + 1}: {question}</h5>
    
    {/* Display the corresponding array from answersArray */}
    {answersArray[index] && answersArray[index].map((answer, innerIndex) => (
      <div key={innerIndex}>
        <p>{answer}</p>
      </div>
    ))}
  </div>
))}
               
            </div>
           
        )}
        
      </>
    );
  }
  
}

export default App;