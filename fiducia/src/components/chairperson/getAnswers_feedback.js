import React, { Component } from 'react';
import Web3 from 'web3';
import ChairFeedbackNav from './chairperson_FeedbackNavbar'
import { ABI, address } from '../config_feedback.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      no_of_q: 0,
      questions_array: [],
      type_of_ans: [],
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
             
            /**/
           
           
            console.log("no of questions:"+this.state.no_of_q);
            console.log("questions:"+JSON.stringify(this.state.questions_array));
          console.log('type of answers:' + this.state.type_of_ans);
          console.log('option array:' + JSON.stringify(this.state.option_array));
          console.log('count answer array:' + JSON.stringify(this.state.countAnswerArray));
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
    const { scontract ,no_of_q} = this.state;
    let v = []
    for(let i=0;i<no_of_q;i++)
    {
      const result = await scontract.methods.get_type(i).call();
      v.push(result);
    }
    
    this.setState({ type_of_ans: v });
  }

  async options() {
    const { scontract } = this.state;
    let d = Array.from({ length: Number(this.state.no_of_q) }, () =>
      Array.from({ length: 4 }, () => '')
    );
  
    for (let i = 0; i < Number(this.state.no_of_q); i++) {
      let c = [];
      c = await scontract.methods.get_options(i).call();
  
      for (let j = 0; j < 4; j++) {
        if (c[j] !== "") {
          d[i][j] = c[j];
        }
      }
    }
  
    this.setState({ option_array: d }, () => {
      console.log("option_array updated:", this.state.option_array);
    });
  }
 
  
  
  
  
  
  
  // Inside your App component class
  async determineCountAnswers(Arr) {
    const { option_array, no_of_q ,answersArray} = this.state;
    let q = [];
    console.log("answers Array1:"+answersArray)
    let a = Arr
    console.log("Captured answers Array in 'a':", a);
    //console.log("Ans array:"+this.state.answersArray)
    for (let i = 0; i < no_of_q; i++) {
      let row = [];
      console.log(option_array[i])
      if (option_array[i] !== undefined && Array.isArray(option_array[i])) {
        for (let j = 0; j < 4; j++) {
          if (option_array[i][j] !== undefined && option_array[i][j] !== "") {
            let ele = option_array[i][j];
            console.log("ele:" + ele)
            console.log("answers Array2:"+a)
            const count = a.flat().filter((element) => element === ele).length;
            console.log(`count of ${ele}: ${count}`);
            row.push(count);
          }
        
      }}
      q.push(row);
    }
  
    this.setState({ countAnswerArray: q });
  }
  
  
  
  
  
  
  

// Call this function after you have fetched option_array and answersArray


  async get_answers() {
    const { scontract, no_of_q ,option_array} = this.state;
    let arr = [];
    console.log("option array:"+option_array)
    for (let i = 0; i < no_of_q; i++) {
      let a = await scontract.methods.getAnswersForQuestion(i).call();
      console.log("answers for question " + (i + 1) + ": " + a);
      
      let questionAnswers = [];
      for (let j = 0; j < a.length; j++) {
        if (a[j] !== undefined) {
          questionAnswers.push(a[j]);
         // console.log("answer " + j + " for question " + i + ": " + a[j]);
        }
      }
      
      arr.push(questionAnswers);
    }
  
  
    this.setState({ answersArray: arr }, () => {
      // You should access answersArray here
      console.log("answersArray: ", this.state.answersArray);
    });
    await this.determineCountAnswers(arr);
   // console.log(q);
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
      <ChairFeedbackNav>
      <>
        
      
      
        {option_array.length > 0  && (
              <div className='container'>
               {questions_array.map((question, index) => (
                <div key={index}>
                  <h5>{index + 1}: {question}</h5>
      
                  {/* Render options for the current question */}
                 {type_of_ans[index]==='radiobutton' &&  (<div >
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
                  </div>)}
                  {type_of_ans[index]==='text field' &&  (
                    <>
                     {answersArray[index] && answersArray[index].map((answer, innerIndex) => (
      <div key={innerIndex}>
        <p>{answer}</p>
      </div>
    ))}
                    </>
                  )}
                </div>
              ))}
               
            </div>
           
        )}
        
        
      </>
      </ChairFeedbackNav>
    );
  }
  
}

export default App;