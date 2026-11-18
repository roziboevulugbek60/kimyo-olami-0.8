// KIMYO DETEKTIVI - O'YIN KODI

const questions = [
    {
        question: "Suvning kimyoviy formulasini aniqlang!",
        description: "Oddiy ko‘rinadigan, ammo hayot uchun juda muhim modda.",
        clue: "Bu modda ikkita vodorod va bitta kislorod atomidan tashkil topgan.",
        answers: ["CO₂", "H₂O", "O₂", "NaCl"],
        correct: "H₂O",
        hint: "Formulada H harfi vodorodni bildiradi.",
        icon: "💧",
        difficulty: "Oson"
    },
    {
        question: "Qaysi gaz nafas olishimiz uchun zarur?",
        description: "Atmosferadagi muhim gazni toping.",
        clue: "Uning kimyoviy belgisi O₂. Havoda taxminan 21% ni tashkil qiladi.",
        answers: ["Azot", "Vodorod", "Kislorod", "Karbonat angidrid"],
        correct: "Kislorod",
        hint: "Uning belgisi O harfi bilan boshlanadi.",
        icon: "🌬️",
        difficulty: "Oson"
    },
    {
        question: "Osh tuzining formulasini toping!",
        description: "Oshxonada ko‘p ishlatiladigan kristall modda.",
        clue: "U natriy va xlor elementlaridan tashkil topgan.",
        answers: ["NaCl", "HCl", "KOH", "CaCO₃"],
        correct: "NaCl",
        hint: "Natriyning belgisi Na, xlorning belgisi Cl.",
        icon: "🧂",
        difficulty: "Oson"
    },
    {
        question: "Qaysi elementning belgisi Fe?",
        description: "Metall elementni aniqlang.",
        clue: "Bu metall qurilishda va turli buyumlar ishlab chiqarishda keng qo‘llanadi.",
        answers: ["Mis", "Oltin", "Temir", "Kumush"],
        correct: "Temir",
        hint: "Temirning lotincha nomi Ferrum.",
        icon: "🔩",
        difficulty: "O‘rta"
    },
    {
        question: "Karbonat angidridning formulasini toping!",
        description: "Nafas chiqarishda ham hosil bo‘ladigan gaz.",
        clue: "Uning tarkibida bitta uglerod va ikkita kislorod atomi bor.",
        answers: ["CO", "CO₂", "CH₄", "O₂"],
        correct: "CO₂",
        hint: "C — uglerod, O — kislorod.",
        icon: "🫧",
        difficulty: "O‘rta"
    },
    {
        question: "Davriy jadvalda Au qaysi element?",
        description: "Qimmatbaho metallni aniqlang.",
        clue: "U sariq rangli, qimmatbaho va zargarlik buyumlarida ishlatiladi.",
        answers: ["Kumush", "Mis", "Oltin", "Temir"],
        correct: "Oltin",
        hint: "Uning lotincha nomi Aurum.",
        icon: "🪙",
        difficulty: "O‘rta"
    },
    {
        question: "pH qiymati 7 ga teng bo‘lgan eritma qanday?",
        description: "Eritmaning muhitini aniqlang.",
        clue: "Bu qiymat odatdagi suvning neytral muhitini ifodalaydi.",
        answers: ["Kislotali", "Ishqoriy", "Neytral", "Juda kislotali"],
        correct: "Neytral",
        hint: "Bu muhit na kislotali, na ishqoriy hisoblanadi.",
        icon: "⚗️",
        difficulty: "Qiyin"
    },
    {
        question: "Vodorodning kimyoviy belgisi qaysi?",
        description: "Eng yengil kimyoviy elementni toping.",
        clue: "U davriy jadvalning birinchi elementidir.",
        answers: ["He", "H", "O", "N"],
        correct: "H",
        hint: "Uning belgisi bitta harfdan iborat.",
        icon: "⚛️",
        difficulty: "Qiyin"
    },
    {
        question: "Metanning formulasini aniqlang!",
        description: "Oddiy uglevodorodlardan birini toping.",
        clue: "U bitta uglerod va to‘rtta vodorod atomidan tashkil topgan.",
        answers: ["CH₄", "C₂H₆", "CO₂", "NH₃"],
        correct: "CH₄",
        hint: "Formula C harfi bilan boshlanadi va to‘rtta H atomiga ega.",
        icon: "🔥",
        difficulty: "Qiyin"
    },
    {
        question: "Ammiakning kimyoviy formulasini toping!",
        description: "Azot va vodoroddan tashkil topgan birikma.",
        clue: "Uning tarkibida bitta azot va uchta vodorod atomi mavjud.",
        answers: ["H₂O", "NH₃", "HCl", "NO₂"],
        correct: "NH₃",
        hint: "Azotning belgisi N, vodorodniki H.",
        icon: "🧪",
        difficulty: "Ekspert"
    }
];

// HTML elementlari
const scoreEl = document.getElementById("score");
const recordEl = document.getElementById("record");
const levelEl = document.getElementById("level");
const timerEl = document.getElementById("timer");
const timerCard = document.querySelector(".timer-card");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const questionEl = document.getElementById("question");
const descriptionEl = document.getElementById("description");
const clueEl = document.getElementById("clue");
const mysteryIcon = document.getElementById("mysteryIcon");
const questionNumber = document.getElementById("questionNumber");
const difficultyEl = document.getElementById("difficulty");

const answersEl = document.getElementById("answers");
const hintBtn = document.getElementById("hintBtn");
const hintText = document.getElementById("hintText");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

const gamePanel = document.getElementById("gamePanel");
const welcomeScreen = document.getElementById("welcomeScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const soundBtn = document.getElementById("soundBtn");

// O'yin holati
let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timerInterval = null;
let answered = false;
let hintUsed = false;
let soundEnabled = true;
let audioContext = null;

let record = Number(localStorage.getItem("kimyoDetektiviRecord")) || 0;

recordEl.textContent = record;

// Javoblar tartibini aralashtirish
function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

// Ovoz effektlari
function playSound(type) {
    if (!soundEnabled) return;

    try {
        if (!audioContext) {
            audioContext = new (
                window.AudioContext || window.webkitAudioContext
            )();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        const sounds = {
            click: [500, 0.08],
            correct: [850, 0.18],
            wrong: [180, 0.22],
            finish: [650, 0.35]
        };

        const sound = sounds[type] || sounds.click;

        oscillator.frequency.value = sound[0];
        oscillator.type = "sine";

        gain.gain.setValueAtTime(0.12, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + sound[1]
        );

        oscillator.start();
        oscillator.stop(audioContext.currentTime + sound[1]);
    } catch (error) {
        console.log("Ovoz ishlamadi:", error);
    }
}

// Ovoz tugmasi
soundBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundBtn.textContent = soundEnabled ? "🔊" : "🔇";

    if (soundEnabled) {
        playSound("click");
    }
});

// O'yinni boshlash
function startGame() {
    clearInterval(timerInterval);

    currentQuestion = 0;
    score = 0;

    scoreEl.textContent = score;

    welcomeScreen.style.display = "none";
    resultScreen.hidden = true;
    gamePanel.style.display = "block";

    playSound("click");
    showQuestion();
}

// Savolni ko'rsatish
function showQuestion() {
    clearInterval(timerInterval);

    if (currentQuestion >= questions.length) {
        finishGame();
        return;
    }

    answered = false;
    hintUsed = false;
    timeLeft = 20;

    const q = questions[currentQuestion];

    questionEl.textContent = q.question;
    descriptionEl.textContent = q.description;
    clueEl.textContent = q.clue;

    mysteryIcon.textContent = q.icon;
    difficultyEl.textContent = q.difficulty;

    questionNumber.textContent =
        `${currentQuestion + 1}-ISH / ${questions.length}`;

    levelEl.textContent =
        `${currentQuestion + 1}/${questions.length}`;

    progressText.textContent =
        `${currentQuestion} / ${questions.length}`;

    progressFill.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    timerEl.textContent = timeLeft;
    timerCard.classList.remove("urgent");

    hintText.textContent = "";
    hintBtn.disabled = false;

    feedback.textContent = "";
    feedback.className = "feedback";

    nextBtn.hidden = true;

    // Javoblarni aralashtirish
    answersEl.innerHTML = "";

    const shuffledAnswers = shuffle(q.answers);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(answer, button);
        });

        answersEl.appendChild(button);
    });

    startTimer();
}

// Vaqt hisoblagichi
function startTimer() {
    timerInterval = setInterval(() => {
        if (answered) return;

        timeLeft--;

        timerEl.textContent = timeLeft;

        if (timeLeft <= 5) {
            timerCard.classList.add("urgent");
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeFinished();
        }
    }, 1000);
}

// Javobni tekshirish
function checkAnswer(selected, clickedButton) {
    if (answered) return;

    answered = true;
    clearInterval(timerInterval);

    const q = questions[currentQuestion];
    const buttons = answersEl.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === q.correct) {
            button.classList.add("correct");
        }
    });

    if (selected === q.correct) {
        clickedButton.classList.add("correct");

        const gained = 10 + Math.floor(timeLeft / 5);
        score += gained;

        scoreEl.textContent = score;

        feedback.textContent =
            `✅ To‘g‘ri! +${gained} ball. Ajoyib detektiv!`;

        feedback.className = "feedback good";

        playSound("correct");
    } else {
        clickedButton.classList.add("wrong");

        feedback.textContent =
            `❌ Noto‘g‘ri! To‘g‘ri javob: ${q.correct}`;

        feedback.className = "feedback bad";

        gamePanel.classList.remove("shake");
        void gamePanel.offsetWidth;
        gamePanel.classList.add("shake");

        playSound("wrong");
    }

    finishQuestion();
}

// Vaqt tugashi
function timeFinished() {
    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];
    const buttons = answersEl.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === q.correct) {
            button.classList.add("correct");
        }
    });

    feedback.textContent =
        `⏰ Vaqt tugadi! To‘g‘ri javob: ${q.correct}`;

    feedback.className = "feedback bad";

    playSound("wrong");

    finishQuestion();
}

// Savol yakuni
function finishQuestion() {
    clearInterval(timerInterval);

    hintBtn.disabled = true;

    progressText.textContent =
        `${currentQuestion + 1} / ${questions.length}`;

    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextBtn.hidden = false;

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "🏆 Natijani ko‘rish";
    } else {
        nextBtn.textContent = "Keyingi bosqich ➜";
    }
}

// Maslahat
hintBtn.addEventListener("click", () => {
    if (answered || hintUsed) return;

    hintUsed = true;

    const q = questions[currentQuestion];

    hintText.textContent = "💡 " + q.hint;

    score = Math.max(0, score - 5);

    scoreEl.textContent = score;

    hintBtn.disabled = true;

    playSound("click");
});

// Keyingi savol
nextBtn.addEventListener("click", () => {
    playSound("click");

    currentQuestion++;

    if (currentQuestion >= questions.length) {
        finishGame();
    } else {
        showQuestion();
    }
});

// O'yin yakuni
function finishGame() {
    clearInterval(timerInterval);

    gamePanel.style.display = "none";
    resultScreen.hidden = false;

    const oldRecord = record;
    const newRecord = score > oldRecord;

    if (newRecord) {
        record = score;

        localStorage.setItem(
            "kimyoDetektiviRecord",
            record
        );
    }

    recordEl.textContent = record;

    document.getElementById("finalScore").textContent = score;

    const resultIcon = document.getElementById("resultIcon");
    const resultTitle = document.getElementById("resultTitle");
    const resultMessage = document.getElementById("resultMessage");
    const recordMessage = document.getElementById("recordMessage");

    if (score >= 120) {
        resultIcon.textContent = "🏆";
        resultTitle.textContent = "Super detektiv!";
        resultMessage.textContent =
            "Sen kimyo sirlarini juda yaxshi aniqlading!";
    } else if (score >= 70) {
        resultIcon.textContent = "🥇";
        resultTitle.textContent = "Ajoyib natija!";
        resultMessage.textContent =
            "Juda yaxshi! Kimyo bilimlaring mustahkamlanmoqda.";
    } else {
        resultIcon.textContent = "🧪";
        resultTitle.textContent = "Yaxshi harakat!";
        resultMessage.textContent =
            "Yana urinib ko‘r. Har bir urinishda yangi bilim olasan!";
    }

    recordMessage.textContent = newRecord
        ? "🎉 Yangi rekord o‘rnatding!"
        : `Eng yaxshi rekording: ${record} ball`;

    progressText.textContent =
        `${questions.length} / ${questions.length}`;

    progressFill.style.width = "100%";

    playSound("finish");
}

// Qayta boshlash
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

// Sahifadan chiqishda vaqtni to'xtatish
window.addEventListener("beforeunload", () => {
    clearInterval(timerInterval);
});