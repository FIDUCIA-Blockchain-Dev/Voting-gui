export const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "AnswersMap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "question_no",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Answers_with_Question",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "question_no",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Questions",
    "outputs": [
      {
        "internalType": "string",
        "name": "questions",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "type_of_ans",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Questions_And_Answers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "question",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "answer",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "chairperson",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "keys",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "start",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "address",
        "name": "user_address",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "registered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "Start",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "a",
        "type": "bool"
      }
    ],
    "name": "set_isReset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "get_isReset",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "no_of_q",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "question",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "no_of_qu",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "ty",
        "type": "string[]"
      }
    ],
    "name": "questions_input",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "q_no",
        "type": "uint256"
      },
      {
        "internalType": "string[4]",
        "name": "answer",
        "type": "string[4]"
      }
    ],
    "name": "answers_input",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "question_no",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "answer1",
        "type": "string"
      }
    ],
    "name": "answers",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "question_no",
        "type": "uint256"
      }
    ],
    "name": "getAnswersForQuestion",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "q_no",
        "type": "uint256"
      }
    ],
    "name": "get_Questions",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "q_no",
        "type": "uint256"
      }
    ],
    "name": "get_options",
    "outputs": [
      {
        "internalType": "string[4]",
        "name": "",
        "type": "string[4]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "q_no",
        "type": "uint256"
      }
    ],
    "name": "get_type",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "reset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
export const address = "0xC7Fbfd19F7ad6EDf767fAE161fA58D4f016254EE"