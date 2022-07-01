const question = document.getElementById("question");
const answerBlock = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const sumbitButton = document.getElementById("submit-btn");
const retryButton = document.getElementById("retry-btn");
const imagecontainer = document.getElementById("imagecontainer"); 
const image= document.getElementById("image");
const ans1 = document.getElementById("ans1");
const ans2 = document.getElementById("ans2");
const ans3 = document.getElementById("ans3");
const ans4 = document.getElementById("ans4");
let questionCount=0;
let questionIndex=-1;
let displayedQues=[];
let userAnswer=-1;
let Score=0;


function startQuiz(){
    startButton.classList.add("hide");
    nextButton.classList.add("hide");
    answerBlock.classList.remove("hide");
    questionIndex = Math.floor(Math.random()*4);
    nextQues();
}

function showNextBtn(){
    nextButton.classList.remove("hide");
}

function removeColor(){
    ans1.classList.remove("changeColor");
    ans2.classList.remove("changeColor");
    ans3.classList.remove("changeColor");
    ans4.classList.remove("changeColor");
}

function choice1(){
    removeColor();
    ans1.classList.add("changeColor");
    userAnswer=0;
    console.log(userAnswer+" "+postquiz[questionIndex].answer);
    showNextBtn();
}

function choice2(){
    removeColor();
    ans2.classList.add("changeColor");
    userAnswer=1;
    console.log(userAnswer+" "+postquiz[questionIndex].answer);
    showNextBtn();
}

function choice3(){
    removeColor();
    ans3.classList.add("changeColor");
    userAnswer=2;
    console.log(userAnswer+" "+postquiz[questionIndex].answer);
    showNextBtn();
}

function choice4(){
    removeColor();
    ans4.classList.add("changeColor");
    userAnswer=3;
    console.log(userAnswer+" "+postquiz[questionIndex].answer);
    showNextBtn();
}

function nextQues(){
    nextButton.classList.add("hide");
    if(userAnswer!==-1 && questionIndex!==-1 && userAnswer===postquiz[questionIndex].answer){
        Score++;
        console.log("Score "+Score);
    }
    if(questionCount===4){
        showSubmit();
        return;
    }
    removeColor();
    questionCount++;
    while(displayedQues.includes(questionIndex)){
        questionIndex = Math.floor(Math.random()*4);
    }
    displayedQues.push(questionIndex);
    question.innerHTML=postquiz[questionIndex].q;
    image.setAttribute("src",postquiz[questionIndex].img);
    imagecontainer.classList.remove("hide");
    ans1.innerHTML=postquiz[questionIndex].options[0];
    ans2.innerHTML=postquiz[questionIndex].options[1];
    ans3.innerHTML=postquiz[questionIndex].options[2];
    ans4.innerHTML=postquiz[questionIndex].options[3];
}

function showSubmit(){
    question.innerHTML="Submit your quiz for evaluation!"
    answerBlock.classList.add("hide");
    nextButton.classList.add("hide");
    sumbitButton.classList.remove("hide");
    imagecontainer.classList.add("hide");
}

function submitQuiz(){
    sumbitButton.classList.add("hide");
    answerBlock.classList.remove("hide");
    question.innerHTML="Your Score";
    answerBlock.innerHTML=`${Score}/4`;
    imagecontainer.classList.remove("hide");
    image.classList.remove("quesimg");
    image.classList.add("crctimg");
    image.setAttribute("src","images/checked.png");
    retryButton.classList.remove("hide");
    answerBlock.classList.add("scoreBoard");
}


function retry(){
    location.reload();
}