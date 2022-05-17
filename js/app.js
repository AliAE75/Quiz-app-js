

const questionNumber = document.querySelector(".question-number"),
questionText = document.querySelector(".question-text"),
optionContainer = document.querySelector(".option-container"),
answersIndicatorContainer = document.querySelector(".answers-indicator"),
homeBox = document.querySelector(".home-box"),
quizBox = document.querySelector(".quiz-box"),
resultBox = document.querySelector(".result-box");
//const questionLimit =  quiz.length;    // if you want all questions 'quiz.length'
const questionLimit =  6;
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// push the questions into availableQuestions Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

// set question number and question and options
function getNewQuestion(){
    // set question number
    // questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;

    // set question text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    // get the postion of 'questionIndex' from the availableQuestions Array
    const index1 = availableQuestions.indexOf(questionIndex);
    // remove the 'questionIndex' from the availableQuestions Array, so that question does not repeat
    availableQuestions.splice(index1,1);
    // show question img if 'img' property exists
    if(currentQuestion.hasOwnProperty("img")){
        const img = document.createElement("img");
        img.src = currentQuestion.img;
        questionText.appendChild(img);
    }
    
    // set options
    // get the length of qptions
    const optionLen = currentQuestion.options.length
    // push options into availableOptions Array
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    // create options in html
    for(let i=0; i<optionLen; i++){
        // random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of 'optonIndex' from the availableOptions Array
        const index2 = availableOptions.indexOf(optonIndex);
        // remove the 'optonIndex' from the availableOptions Array, so that the option does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's'
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    }

    questionCounter++

}

// get the result of current attempt question
function getResult(elememt){
    const id = parseInt(elememt.id);
    // get the answer by compating the id of clickes option
    if(id === currentQuestion.answer){
        // set the green color to  the correct option
        elememt.classList.add("correct");
        // add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        // set the red color to  the incorrect option
        elememt.classList.add("wrong");
        // add the indicator to incorrect mark
        updateAnswerIndicator("wrong");

        // if the answer is incorrect, show the correct optin by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();

}

// make all the options unclikable once the user select a option (RESTRICT THE USER TO CHANGE THEOPTION AGAIN)
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    // const totalQuestion = quiz.length;
    const totalQuestion = questionLimit;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
    // if(questionCounter === quiz.length){
        if(questionCounter === questionLimit){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    // hide quiz box
    quizBox.classList.add("hide");
    // show result box
    resultBox.classList.remove("hide");
    quizResult();
}

// get the quiz Result
function quizResult(){
    // resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    // resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    availableQuestions = [];
}

function tryAgainQuiz() {
    // hide the resultBox
    resultBox.classList.add("hide");
    // show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}


 function goToHome(){
    // hide result box
    resultBox.classList.add("hide");
    // show home box
    homeBox.classList.remove("hide");
    resetQuiz();
 }

// #### STARTING POINT ####

function startQuiz(){

    // hide home box
    homeBox.classList.add("hide");
    // show quiz box
    quizBox.classList.remove("hide");
    // first we will set all question in availableQuestions Array
    setAvailableQuestions();
    // second we will call getNewQuestion(); function
    getNewQuestion();
    // to creat indicator of answers
    answersIndicator();

}

window.onload = function(){
    // homeBox.querySelector(".total-question").innerHTML = quiz.length;
    homeBox.querySelector(".total-question").innerHTML = questionLimit;
}