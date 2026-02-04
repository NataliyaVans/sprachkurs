/**
 * Datensatz: Quiz-Fragen
 */
const quiz = [
	{ q: 'Im Garten ... wachsen Kirsch- und Apfelbäume.', options: ['meinem Bruder', 'meines Bruders', 'der Bruder'], answer: 1 },
	{ q: 'An ... gehen viele an den See.', options: ['einem sonnigen Tag', 'einen sonnigen Tag', 'einem sonnigem Tag'], answer: 0 },
	{ q: 'Dieses Buch hat 340 ... .', options: ['Seiten', 'Seite'], answer: 0 },
	{ q: 'Im letzten Jahr habe ich zwei ... absolviert.', options: ['Praktika', 'Praktikum', 'Praktikums'], answer: 0 },
	{ q: 'Mithilfe ... wurde der Schrank sehr schnell aufgebaut.', options: ['die Anleitung', 'des Anleitungs', 'der Anleitung'], answer: 2 },
	{ q: 'Der Kunde legte seine Tasche auf ... .', options: ['den Stuhl', 'dem Stuhl', 'der Stuhl'], answer: 0 },
	{ q: 'Sie gratulierte ... zum Geburtstag.', options: ['ihrem Freund', 'ihren Freund', 'ihr Freund'], answer: 0 },
	{ q: 'Der Nachbar hat sich mit seinem ... vorgestellt.', options: ['vollständigen Namen', 'vollständigen Name', 'vollständigem Namen'], answer: 0 },
	{ q: 'Während ... arbeiten einige Kommilitonen als Werkstudenten.', options: ['der Ferien', 'den Ferien', 'des Feriens'], answer: 0 },
	{ q: 'Auf der Route ... liegt ein Wald.', options: ['dieses Busses', 'diesen Busses', 'dieser Bus'], answer: 0 },
	{ q: 'Wegen ... wird der Versicherungsbeitrag erhöht.', options: ['einem Unfall', 'eines Unfalls', 'ein Unfall'], answer: 1 },
	{ q: 'Beim Schreiben ... wurde wissenschaftliche Literatur herangezogen.', options: ['des Textes', 'des Text', 'dem Text'], answer: 0 }
];

// DOM-Element Referenzen für effizienten Zugriff
const questionNumber = document.querySelector(".fragen-anzahl");
const questionText = document.querySelector(".fragestellung");
const optionContainer = document.querySelector(".antwortmoeglichkeiten");
const answersIndicatorContainer = document.querySelector(".kontrollanzeige");
const infoBox = document.querySelector(".infobox");
const quizBox = document.querySelector(".quizbox");
const ergebnisBox = document.querySelector(".ergebnisbox");

let quizLen = 5; // Anzahl der Fragen pro Session
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let correctAnswers = 0;

/**
 * Initialisierung des Fragen-Pools
 */
function setAvailableQuestions() {
	availableQuestions = [...quiz];
}

/**
 * Rendern einer neuen Frage inkl. Randomisierung der Optionen
 */
function getNewQuestion() {
	questionNumber.innerHTML = "Frage " + (questionCounter + 1) + " von " + quizLen;
	
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	questionText.innerHTML = currentQuestion.q;
	
	availableQuestions.splice(questionIndex, 1);
	
	optionContainer.innerHTML = '';
	currentQuestion.options.forEach((opt, index) => {
		const option = document.createElement("div");
		option.innerHTML = opt;
		option.id = index;
		option.className = "option";
		option.setAttribute("onclick", "getResult(this)");
		optionContainer.appendChild(option);
	});
	
	questionCounter++;
}

/**
 * Validierung der gewählten Antwort
 */
function getResult(element) {
	const id = parseInt(element.id);
	if(id === currentQuestion.answer) {
		element.classList.add("richtig");
		updateAnswerIndicator("richtig");
		correctAnswers++;
	} else {
		element.classList.add("falsch");
		updateAnswerIndicator("falsch");
		// Richtige Lösung highlighten (UX-Feedback)
		optionContainer.children[currentQuestion.answer].classList.add("richtig");
	}
	unclickableOptions();
}

function unclickableOptions() {
	Array.from(optionContainer.children).forEach(opt => opt.classList.add("beantwortet"));
}

function answersIndicator() {
	answersIndicatorContainer.innerHTML = '';
	for(let i=0; i < quizLen; i++) {
		const indicator = document.createElement("div");
		answersIndicatorContainer.appendChild(indicator);
	}
}

function updateAnswerIndicator(markierung) {
	answersIndicatorContainer.children[questionCounter-1].classList.add(markierung);
}

function next() {
	if(questionCounter === quizLen) {
		quizOver();
	} else {
		getNewQuestion();
	}
}

function quizOver() {
	quizBox.classList.add("hide");
	ergebnisBox.classList.remove("hide");
	ergebnisBox.querySelector(".fragen-gesamtanzahl").innerHTML = quizLen;
	ergebnisBox.querySelector(".richtig-count").innerHTML = correctAnswers;
}

function quizStarten() {
	infoBox.classList.add("hide");
	quizBox.classList.remove("hide");
	resetQuiz();
	setAvailableQuestions();
	getNewQuestion();
	answersIndicator();
}

function quizWiederholen() {
	ergebnisBox.classList.add("hide");
	quizStarten();
}

function resetQuiz() {
	questionCounter = 0;
	correctAnswers = 0;
}

// Initialer UI-State
window.onload = () => {
	infoBox.querySelector(".fragen-gesamtanzahl").innerHTML = quizLen;
};