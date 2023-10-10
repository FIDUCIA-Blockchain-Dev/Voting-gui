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
          await this.get_isReset();
          if(this.state.isReset===true)
          {
            await this.reset();
          }
          await this.no_of_questions();
          // Then, fetch the questions
          await this.questions();

          await this.type_of_answers();
            await this.options();
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
  handleOptions = (e, questionIndex, optionIndex) => {
    const { selectedOptions } = this.state;
    const newSelectedOptions = [...selectedOptions];
  
    // Toggle the option's selection state
    if (e.target.checked) {
      newSelectedOptions[questionIndex] = newSelectedOptions[questionIndex] || [];
      newSelectedOptions[questionIndex][optionIndex] = e.target.value;
    } else {
      newSelectedOptions[questionIndex][optionIndex] = "";
    }
  
    this.setState({ selectedOptions: newSelectedOptions });
  };
  async inputAnswers() {
    const { selectedOptions, scontract, account } = this.state;
    const promises = []
    // Loop through selectedOptions and process the selected options as needed
    for (let i = 0; i < selectedOptions.length; i++) {
      const selectedQuestionOptions = selectedOptions[i];
      console.log(`Question ${i + 1} - Selected Options:`, selectedQuestionOptions);
      
      for (let j = 0; j < 4; j++) {
        if (selectedOptions[i][j] !== undefined) {
          console.log(selectedOptions[i][j]);
          await this.sendAnswer(i, selectedOptions[i][j], scontract, account,promises);
        }
      }
      console.log("answer string:"+await scontract.methods.getAnswersForQuestion(i).call());
      // You can perform further actions with the selected options here
    }
    try {
      // Use Promise.all() to send all transactions asynchronously
      await Promise.all(promises);
      console.log('All transactions have been sent.');
    } catch (error) {
      console.error('Error sending transactions:', error);
    }
  }
  
  async sendAnswer(questionIndex, selectedOption, scontract, account,promises) {
    try {
      const transaction =  scontract.methods.answers(questionIndex, selectedOption);
      const transactionObject = {
        from: this.state.account,
        gas: 200000, // Adjust the gas limit as needed
      };
      promises.push(transaction.send(transactionObject));
      console.log(`Answer for Question ${questionIndex + 1} sent successfully.`);
      // You can add any additional handling or error checking here
    } catch (error) {
      console.error(`Error sending answer for Question ${questionIndex + 1}:`, error);
      // Handle errors as needed
    }
    
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
  handleRadio = (e, questionIndex) => {
    const { selectedRadioOptions } = this.state;
    const newSelectedRadioOptions = [...selectedRadioOptions];
  
    // Update the selected radio option for the current question
    newSelectedRadioOptions[questionIndex] = e.target.value;
  
    this.setState({ selectedRadioOptions: newSelectedRadioOptions });
  };
  async inputRadio() {
    const { selectedRadioOptions, scontract, account } = this.state;
  
    // Loop through selectedRadioOptions and process the selected options as needed
    for (let i = 0; i < selectedRadioOptions.length; i++) {
      const selectedOption = selectedRadioOptions[i];
      console.log(`Question ${i + 1} - Selected Option:`, selectedOption);
  
      if (selectedOption) {
        this.sendRadioAnswer(i, selectedOption, scontract, account);
        console.log("answer string:"+await scontract.methods.getAnswersForQuestion(i).call());
      }
      
    }
  }
  
  async sendRadioAnswer(questionIndex, selectedOption, scontract, account) {
    try {
      await scontract.methods.answers(questionIndex, selectedOption).send({ from: account });
      console.log(`Answer for Question ${questionIndex + 1} sent successfully.`);
      // You can add any additional handling or error checking here
    } catch (error) {
      console.error(`Error sending answer for Question ${questionIndex + 1}:`, error);
      // Handle errors as needed
    }
  }

  handleText = (e, questionIndex) => {
    const { textResponses } = this.state;
    const newTextResponses = [...textResponses];
  
    // Update the text response for the current question
    newTextResponses[questionIndex] = e.target.value;
  
    this.setState({ textResponses: newTextResponses });
  };
  async inputText() {
    const { textResponses, scontract, account } = this.state;
  
    // Loop through textResponses and process the entered text as needed
    for (let i = 0; i < textResponses.length; i++) {
      const textResponse = textResponses[i];
      console.log(`Question ${i + 1} - Text Response:`, textResponse);
  
      if (textResponse) {
        this.sendTextAnswer(i, textResponse, scontract, account);
      }
    }
  }
  
  async sendTextAnswer(questionIndex, textResponse, scontract, account) {
    try {
      await scontract.methods.answers(questionIndex, textResponse).send({ from: account });
      console.log(`Answer for Question ${questionIndex + 1} sent successfully.`);
      console.log("answer string:"+await scontract.methods.getAnswersForQuestion(questionIndex).call());
      // You can add any additional handling or error checking here
    } catch (error) {
      console.error(`Error sending answer for Question ${questionIndex + 1}:`, error);
      // Handle errors as needed
    }
  }

  render() {
    const { questions_array, option_array,type_of_ans } = this.state;
    return (
      <>
        
  
        {option_array.length > 0 && type_of_ans === 'checkbox' && (
              <div className='container'>
              {questions_array.map((question, index) => (
                <div key={index}>
                  <h5>{index + 1}: {question}</h5>
      
                  {/* Render options for the current question */}
                  <div style={{ display: 'flex' }}>
                    {option_array[index].map((option, innerIndex) => (
                      <div key={innerIndex} className="form-check" style={{ marginRight: '10px' }}>
                        <input className="form-check-input" type="checkbox" value={option} id={`flexCheckDefault${index}-${innerIndex}`}  checked={this.state.selectedOptions[index] && this.state.selectedOptions[index][innerIndex] === option}
      onChange={(e) => this.handleOptions(e, index, innerIndex)} />
                        <label className="form-check-label" htmlFor={`flexCheckDefault${index}-${innerIndex}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
               <div className='container mb-3 flex' style={{ marginUp: '100px' }}>
            <button  type="button"class="btn btn-success" onClick={() => this.inputAnswers()}>Submit</button>
            </div>
            </div>
           
        )}
        {option_array.length > 0 && type_of_ans === 'radiobutton' && (
              <div className='container'>
              {questions_array.map((question, index) => (
                <div key={index}>
                  <h5>{index + 1}: {question}</h5>
      
                  {/* Render options for the current question */}
                  <div style={{ display: 'flex' }}>
                    {option_array[index].map((option, innerIndex) => (
                      <div key={innerIndex} className="form-check" style={{ marginRight: '10px' }}>
                        <input className="form-check-input" type="radio" value={option} name={`radioGroup_${index}`} id={`flexCheckDefault${index}-${innerIndex}`} checked={this.state.selectedRadioOptions[index] === option}
      onChange={(e) => this.handleRadio(e, index)} />
                        <label className="form-check-label" htmlFor={`flexCheckDefault${index}-${innerIndex}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
               <div className='container mb-3 flex' style={{ marginUp: '100px' }}>
            <button  type="button"class="btn btn-success" onClick={() => this.inputRadio()}>Submit</button>
            </div>
            </div>
           
        )}
        {option_array.length > 0 && type_of_ans === 'text field' && (
              <div className='container'>
              {questions_array.map((question, index) => (
                <div key={index}>
                  <h5>{index + 1}: {question}</h5>
                  
                  <input type="text" class="form-control" placeholder="Your answer"
      value={this.state.textResponses[index] || ''}
      onChange={(e) => this.handleText(e, index)}
      aria-label={`Answer for question ${index + 1}`}/>
                  {/* Render options for the current question */}
                 
                </div>
              ))}
               <div className='container mb-3 flex' style={{ marginUp: '100px' }}>
            <button  type="button"class="btn btn-success" onClick={() => this.inputText()}>Submit</button>
            </div>
            </div>
           
        )}
        
      </>
    );
  }
  
}

export default App;
/*  
 {option_array[index].map((option, innerIndex) => (
        <div key={innerIndex} class="form-check">
          <input class="form-check-input" type="checkbox" value={option} id={`flexCheckDefault${index}-${innerIndex}`} onChange={this.state.handleOptions} />
          <label class="form-check-label" for={`flexCheckDefault${index}-${innerIndex}`}>
            {option}
          </label>
        </div>
      ))}

*/


