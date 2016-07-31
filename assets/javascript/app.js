/**
 * QuizQuestion Constructor
 */
function QuizQuestion(
					questionText,
					answers,
					solutionIndex
					) {
	var q = {
		questionText: questionText,
		answers: answers,
		solutionIndex: solutionIndex
	};
	return q;
}

/**
 * Trivia Game Object
 *
 * Controls the StopWatch for the game,
 * as well as the Quiz Question and Answer Logic.
 */
var triviaGame = {

		//StopWatch Section
		defaultTime: 0,
		currentTime: 0,
		reset: function() {
			console.log("reset");
			triviaGame.currentTime = triviaGame.defaultTime;
			$("#time-left").html(triviaGame.currentTime);
			console.log("count: " + triviaGame.count);
			var currentQuizQuestion = triviaGame.quiz[triviaGame.count];
			$("#question").html(currentQuizQuestion.questionText);
			for (var i = 0; i < currentQuizQuestion.answers.length; i++) {
				$("#answers").append(
					$('<div>')
						.addClass("answer")
						.text(currentQuizQuestion.answers[i])
				);
			};
		},
		start: function() {
			console.log("start");
			intervalID = setInterval(triviaGame.tick, 1000);
		},
		stop: function() {
			console.log("stop");
			clearInterval(intervalID);
			$("#question").html("");
			$("#answers").empty();
		},
		tick: function() {
			console.log("tick");
			triviaGame.currentTime--;
			$("#time-left").html(triviaGame.currentTime);

			//Ran out of time for question
			if(triviaGame.currentTime === 0) {
				console.log("Time's Up.");
				triviaGame.stop();
				triviaGame.count++;
				if(triviaGame.count < triviaGame.quiz.length) {
					triviaGame.reset();
					triviaGame.start();
				}
				else {
					console.log("no more questions");
				}
			}
		},

		//Quiz Section
		count: 0,// the index of the currently displaying question.
		quiz: [],
		addQuestion: function(question) {
			console.log("added " + question.questionText + " to " + this.quiz.length);
			this.quiz[this.quiz.length] = question;
		},
	}

var intervalID;

function setUp() {
	triviaGame.defaultTime = 3;
	triviaGame.addQuestion(new QuizQuestion("Why?", 
						["because", "why not", "nunya beezwax", "i said so"],
						0
						));
	triviaGame.addQuestion(new QuizQuestion("Where?",
						["here", "there", "hither", "thither"],
						2
						));
	triviaGame.addQuestion(new QuizQuestion("How?",
						["try harder", "cheat", "fake it", "guess"],
						3));
	triviaGame.reset();
}

window.onload = function () {
	setUp();
	triviaGame.start();
};