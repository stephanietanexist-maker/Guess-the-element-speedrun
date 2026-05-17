/*List of images*/

const elements = [
    {
        "image": "./elements/H.png",
        "name": "Hydrogen"
    },
    {
        "image": "./elements/Hg.png",
        "name": "Mercury"
    },
    {
        "image": "./elements/Cd.png",
        "name": "Cadmium"
    },
    {
        "image": "./elements/Li.png",
        "name": "Lithium"
    },
    {
        "image": "./elements/W.png",
        "name": "Tungsten"
    },
    {
        "image": "./elements/Xe.png",
        "name": "Xenon"
    },
    {
        "image": "./elements/Sb.png",
        "name": "Antimony"
    },
    {
        "image": "./elements/Ts.png",
        "name": "Tennessine"
    },
    {
        "image": "./elements/V.png",
        "name": "Vanadium"
    },
    {
        "image": "./elements/Zr.png",
        "name": "Zirconium"
    },
    {
        "image": "./elements/Au.png",
        "name": "Gold"
    },
    {
        "image": "./elements/K.png",
        "name": "Potassium"
    },
    {
        "image": "./elements/Sn.png",
        "name": "Tin"
    },
    {
        "image": "./elements/Pb.png",
        "name": "Lead"
    },
];

const elementImage = document.getElementById("element-image");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

const option0 = document.getElementById("option0");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");

const nextQuestion = document.getElementById("next-question");

let answer = "";
let options = []; // stores option user can choose from
let score = 0;
let timeLeft = 10;
let timerId = null;
let timerExpired = false;

window.onload = function () {
    setQuestion();
    startTimer();
    option0.addEventListener("click", selectOption);
    option1.addEventListener("click", selectOption);
    option2.addEventListener("click", selectOption);
    option3.addEventListener("click", selectOption);
    nextQuestion.addEventListener("click", setQuestion);
}

function setQuestion() {
    options = [];
    let element = elements[randomIndex(elements.length)];
    elementImage.src = element.image;
    answer = element.name;
    options.push(element.name);
    
    while (options.length < 4){
        element = elements[randomIndex (elements.length)];
        if (!options.includes(element.name)){ //Making sure the right answer shows up I think?
            options.push (element.name);
        }
    }

    /*Before, the right answer was the first button, now its gonna randomize where the right answer is*/
    let swapIndex = randomIndex(options.length);
    options[0] = options[swapIndex];
    options [swapIndex] = answer;


    option0.innerText = options[0];
    option1.innerText = options[1];
    option2.innerText = options[2];
    option3.innerText = options[3];

    //reset everything
    option0.disabled = false;
    option1.disabled = false;
    option2.disabled = false;
    option3.disabled = false;

    //resetting the background 
    option0.style.backgroundColor = "grey";
    option1.style.backgroundColor = "grey";
    option2.style.backgroundColor = "grey";
    option3.style.backgroundColor = "grey";

    nextQuestion.hidden = true;
}

function selectOption(){
    if (timerExpired) {
        return;
    }

    //If you select an answer you can't keep clicking
    option0.disabled = true;
    option1.disabled = true;
    option2.disabled = true;
    option3.disabled = true;

    //changing the score depending on if you press the right answer and colour
    if (this.innerText == answer){
        score += 1;
        scoreDisplay.innerText = `Score: ${score}`;
        this.style.backgroundColor = "green";
    }
    else{
        score = Math.max(0, score - 1);
        scoreDisplay.innerText = `Score: ${score}`;
        this.style.backgroundColor = "red";
    }
    nextQuestion.hidden = false; //making the next button exist after pressing a button
}

function startTimer() {
    clearInterval(timerId);
    timeLeft = 10;
    timerDisplay.innerText = `Time: ${timeLeft}`;

    timerId = setInterval(() => {
        timeLeft -= 1;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            timerExpired = true;
            timerDisplay.innerText = "Time's up!";
            option0.disabled = true;
            option1.disabled = true;
            option2.disabled = true;
            option3.disabled = true;
            nextQuestion.hidden = true;
        } else {
            timerDisplay.innerText = `Time: ${timeLeft}`;
        }
    }, 1000);
}

function randomIndex (index) {
    return Math.floor(Math.random() * index ); 
}