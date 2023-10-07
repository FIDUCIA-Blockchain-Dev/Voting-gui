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
  handleOptions = () => {

  }
  async inputAnswers() {

  }
  render() {
    const { questions_array, option_array } = this.state;
    return (
      <>
        
  
        {option_array.length > 0 && (
              <div className='container'>
              {questions_array.map((question, index) => (
                <div key={index}>
                  <h5>{index + 1}: {question}</h5>
      
                  {/* Render options for the current question */}
                  <div style={{ display: 'flex' }}>
                    {option_array[index].map((option, innerIndex) => (
                      <div key={innerIndex} className="form-check" style={{ marginRight: '10px' }}>
                        <input className="form-check-input" type="checkbox" value={option} id={`flexCheckDefault${index}-${innerIndex}`} onChange={this.handleOptions} />
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


