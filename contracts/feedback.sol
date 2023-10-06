pragma solidity ^0.8.17;
// SPDX-License-Identifier: GPL-3.0
contract feedback {
    address public chairperson;
   
    string[] public Questions;
    struct questions_and_answers
    {
        uint question;
        string answer;
    }
    questions_and_answers[] public Questions_And_Answers;
    struct User
    {
        address user_address;
        
        bool registered;
    }
    struct answers_with_question
    {
        uint question_no;
        string[4] answers;
        string type_of_answer;
    }
    answers_with_question[] public Answers_with_Question;
    bool public start = false;
    address[] registered_users;
    mapping(address=>User) public users;
    constructor() {
        chairperson = msg.sender;
    }

    function Start() public {
        //require(!start, "already started");
        start = true;
    }

    function questions_input(string calldata question) public {
        require(start, "Question input is not allowed before starting.");
        require(msg.sender==chairperson,"only chairperson is allowed to input question");
        Questions.push(question);
    }
    function answers_input(uint q_no,string[4] memory answer,string memory t) public {
        require(start, "Question input is not allowed before starting.");
         require(msg.sender==chairperson,"only chairperson is allowed to input options");
         require(q_no >= 0 && q_no < Questions.length, "Invalid question number");
         Answers_with_Question.push(answers_with_question({
            question_no:q_no,
            answers:answer,
            type_of_answer:t
         }));

    }
    function register() public 
    {     
          address person = msg.sender;
          require(start, "cannot register before starting");
        require(msg.sender!=chairperson,"chairperson cannot register");
        require(users[person].registered==false,"user is already registered");
      
        users[person].user_address = person;
        users[person].registered = true;
        registered_users.push(person);

    }
    function answers(uint question_no,string calldata answer1) public {
        require(question_no >= 0 && question_no < Questions.length, "Invalid question number");
         address person = msg.sender;
         require(users[person].registered==true,"user is not registered");
         require(start, "cannot answer before starting");
         Questions_And_Answers.push(questions_and_answers({
             question:question_no,
             answer:answer1
         }));
    }
  function getAnswersForQuestion(uint question_no) public view returns (string[] memory) {
    require(question_no >= 0 && question_no < Questions.length, "Invalid question number");
    require(msg.sender == chairperson, "The user is not a chairperson");
    require(start, "Cannot get answers before starting");

    string[] memory answer = new string[](Questions_And_Answers.length); // Initialize an array with a fixed length

    uint k = 0;
    for (uint i = 0; i < Questions_And_Answers.length; i++) {
        if (Questions_And_Answers[i].question == question_no) {
            answer[k] = Questions_And_Answers[i].answer;
            k++;
        }
    }

    // Resize the array to the correct length
    assembly {
        mstore(answer, k)
    }

    return answer;
}

function reset() public 
{   require(msg.sender==chairperson,"the user is not chairperson");
    start = false;
    //Questions_And_Answers
    //users
    //Questions
    for(uint i=0;i<Questions_And_Answers.length;i++)
    {
        delete Questions_And_Answers[i];
    }
    for(uint i=0;i<registered_users.length;i++)
    {
        delete users[registered_users[i]];
    }
    for(uint i=0;i<Questions.length;i++)
    {
        delete Questions[i];
    }
    for(uint i=0;i<Answers_with_Question.length;i++)
    {
        delete Answers_with_Question[i];
    }
  
}

}