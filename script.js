const questions = [
    {
        question: "Which technology allows AI models such as large language models to understand relationships between words across a sequence?",
        options: [
            "Transformer architecture",
            "Optical fiber",
            "Blockchain",
            "Rasterization"
        ],
        answer: 0
    },

    {
        question: "What is the primary purpose of an AI model's training phase?",
        options: [
            "To learn patterns from data by adjusting its parameters",
            "To permanently store every training example word-for-word",
            "To increase the physical clock speed of the processor",
            "To convert digital information into radio waves"
        ],
        answer: 0
    },

    {
        question: "Which semiconductor component is primarily used to control the flow of current and forms the basic switching element of modern digital processors?",
        options: [
            "Transistor",
            "Transformer",
            "Capacitor",
            "Inductor"
        ],
        answer: 0
    },

    {
        question: "Which property of quantum computers allows qubits to represent quantum states that cannot be described as simply being either 0 or 1 before measurement?",
        options: [
            "Superposition",
            "Compression",
            "Overclocking",
            "Parallel routing"
        ],
        answer: 0
    },

    {
        question: "Which feature of 5G networks is particularly important for applications that require very fast response times?",
        options: [
            "Low latency",
            "Mechanical switching",
            "Magnetic storage",
            "Higher screen resolution"
        ],
        answer: 0
    },

    {
        question: "What is the fundamental idea behind a blockchain's distributed ledger?",
        options: [
            "Multiple network participants maintain synchronized records",
            "One central computer controls every transaction",
            "All information is stored only on the user's device",
            "Transactions are processed without any cryptographic methods"
        ],
        answer: 0
    },

    {
        question: "Which cloud computing model provides virtualized computing resources such as servers, storage and networking over the internet?",
        options: [
            "Infrastructure as a Service",
            "Software as a Service",
            "Firmware as a Service",
            "Hardware Manufacturing as a Service"
        ],
        answer: 0
    },

    {
        question: "What is the main purpose of encryption in cybersecurity?",
        options: [
            "To protect information by transforming it into an unreadable form for unauthorized users",
            "To physically increase the storage capacity of a device",
            "To make internet connections completely independent of networks",
            "To remove all software vulnerabilities automatically"
        ],
        answer: 0
    },

    {
        question: "Which technology overlays computer-generated information onto a user's view of the real world?",
        options: [
            "Augmented Reality",
            "Virtual Reality",
            "Cloud Computing",
            "Edge Computing"
        ],
        answer: 0
    },

    {
        question: "What is a major advantage of edge computing for applications such as autonomous systems and industrial IoT?",
        options: [
            "Processing data closer to where it is generated can reduce latency",
            "It eliminates the need for all computing hardware",
            "It guarantees that every network connection is unlimited",
            "It makes every device independent of software"
        ],
        answer: 0
    }
];
// Shuffle answer options while keeping the correct answer accurate

questions.forEach(question => {

    const correctAnswer = question.options[question.answer];

    question.options.sort(() => Math.random() - 0.5);

    question.answer = question.options.indexOf(correctAnswer);

});


let currentQuestion = 0;
let selectedAnswers = new Array(questions.length).fill(null);

let timeLeft = 300;
let timerInterval;


/* ELEMENTS */

const introScreen = document.getElementById("introScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const restartBtn = document.getElementById("restartBtn");

const timer = document.getElementById("timer");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");

const questionNumber = document.getElementById("questionNumber");
const questionIndex = document.getElementById("questionIndex");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");


/* START QUIZ */

startBtn.addEventListener("click", () => {

    introScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    startTimer();

    showQuestion();

});


/* SHOW QUESTION */

function showQuestion() {

    const question = questions[currentQuestion];

    questionText.textContent = question.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionIndex.textContent =
        String(currentQuestion + 1).padStart(2, "0");


    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressFill.style.width = `${progress}%`;

    progressPercent.textContent =
        `${Math.round(progress)}%`;


    optionsContainer.innerHTML = "";


    question.options.forEach((option, index) => {

        const optionElement = document.createElement("label");

        optionElement.className = "option";

        if (selectedAnswers[currentQuestion] === index) {
            optionElement.classList.add("selected");
        }


        optionElement.innerHTML = `

            <input
                type="radio"
                name="question"
                value="${index}"
                ${selectedAnswers[currentQuestion] === index ? "checked" : ""}
            >

            <span class="option-letter">
                ${String.fromCharCode(65 + index)}
            </span>

            <span>
                ${option}
            </span>

        `;


        optionElement.addEventListener("click", () => {

            selectedAnswers[currentQuestion] = index;

            document
                .querySelectorAll(".option")
                .forEach(option => {
                    option.classList.remove("selected");
                });

            optionElement.classList.add("selected");

        });


        optionsContainer.appendChild(optionElement);

    });


    prevBtn.disabled = currentQuestion === 0;

    if (currentQuestion === questions.length - 1) {

        nextBtn.textContent = "Submit Quiz ✓";

    } else {

        nextBtn.textContent = "Next →";

    }

}


/* NEXT BUTTON */

nextBtn.addEventListener("click", () => {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        finishQuiz();

    }

});


/* PREVIOUS BUTTON */

prevBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

});


/* TIMER */

function startTimer() {

    timerInterval = setInterval(() => {

        timeLeft--;

        updateTimer();


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            finishQuiz();

        }

    }, 1000);

}


function updateTimer() {

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


/* FINISH QUIZ */

function finishQuiz() {

    clearInterval(timerInterval);

    let score = 0;


    questions.forEach((question, index) => {

        if (selectedAnswers[index] === question.answer) {

            score++;

        }

    });


    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");


    document.getElementById("scoreValue").textContent = score;

    showResultMessage(score);

    showAnswerReview();

}


/* RESULT MESSAGE */

function showResultMessage(score) {

    const message =
        document.getElementById("resultMessage");


    if (score === 10) {

        message.textContent =
            "Outstanding! You have excellent knowledge of modern technology.";

    } else if (score >= 8) {

        message.textContent =
            "Excellent work! Your technology fundamentals are strong.";

    } else if (score >= 6) {

        message.textContent =
            "Good job! You have a solid understanding of modern technology.";

    } else if (score >= 4) {

        message.textContent =
            "Nice attempt! There is plenty of interesting technology left to explore.";

    } else {

        message.textContent =
            "Good start! Keep learning and come back for another attempt.";

    }

}


/* ANSWER REVIEW */

function showAnswerReview() {

    const review =
        document.getElementById("answerReview");

    review.innerHTML = "";


    questions.forEach((question, index) => {

        const item =
            document.createElement("div");

        const userAnswer =
            selectedAnswers[index];

        const correct =
            userAnswer === question.answer;


        item.className =
            `review-item ${correct ? "correct" : "incorrect"}`;


        const userAnswerText =
            userAnswer !== null
                ? question.options[userAnswer]
                : "Not answered";


        item.innerHTML = `

            <div class="review-question">
                ${index + 1}. ${question.question}
            </div>

            <div class="review-answer">
                Your answer: ${userAnswerText}
            </div>

            <div class="review-answer">
                Correct answer: ${question.options[question.answer]}
            </div>

        `;


        review.appendChild(item);

    });

}


/* RESTART */

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    selectedAnswers =
        new Array(questions.length).fill(null);

    timeLeft = 300;

    updateTimer();

    resultScreen.classList.add("hidden");

    introScreen.classList.remove("hidden");

});