/**
 * QuizQuestion Constructor
 */
function QuizQuestion(
					questionText,
					answers,
					solutionIndex,
					img
					) {
	var q = {
		questionText: questionText,
		answers: answers,
		solutionIndex: solutionIndex,
		img: img
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
		cooldownTime: 0,
		reset: function() {
			console.log("reset");
			triviaGame.currentTime = triviaGame.defaultTime;
			$("#time-left").html(triviaGame.currentTime);
			console.log("count: " + triviaGame.count);
			triviaGame.currentQuizQuestion = triviaGame.quiz[triviaGame.count];
			$("#question").html(triviaGame.currentQuizQuestion.questionText);
			$("#answers").empty();
			for (var i = 0; i < triviaGame.currentQuizQuestion.answers.length; i++) {
				$("#answers").append(
					$('<div>')
						.addClass("answer")
						.text(triviaGame.currentQuizQuestion.answers[i])
						.attr("data-qid", i)
						.on("click", function() {
							console.log($(this).data("qid") 
								+ "clicked"  + this);
							triviaGame.stop();
							var result = "";
							if($(this).data("qid") == triviaGame.currentQuizQuestion.solutionIndex) {
								result = "correct!";
								triviaGame.correct++;
							}
							else {
								result = "incorrect!";
								triviaGame.incorrect++;
							}
							$("#answers").append(
								$("<h2>").text(result)
							);
							triviaGame.displayAnswer();
						})
				);
			};
		},
		displayAnswer: function() {
			$("#answers").append(
				$('<img>')
				.attr('src', triviaGame.currentQuizQuestion.img)
			);
			$("#answers").append(
				$("<p>").text("The answer is " 
					+ triviaGame.currentQuizQuestion.answers[triviaGame.currentQuizQuestion.solutionIndex])
			);
			setTimeout(triviaGame.advance, triviaGame.cooldownTime * 1000);
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
				triviaGame.unanswered++;
				triviaGame.displayAnswer();
			}
		},
		advance: function () {
			console.log("advance");
			triviaGame.count++;		
			if(triviaGame.count < triviaGame.quiz.length) {
				triviaGame.reset();
				triviaGame.start();
			}
			else {
				console.log("no more questions");
				$("#question").empty();
				$("#answers").empty();
				$("#answers").append(
					$("<div>").text("correct answers: " + triviaGame.correct)
				);
				$("#answers").append(
					$("<div>").text("incorrect answers: " + triviaGame.incorrect)
				);
				$("#answers").append(
					$("<div>").text("unanswered: " + triviaGame.unanswered)
				);
				$("#answers").append(
					$("<div>").attr('id', 'playagain').text("Play Again?").on("click", function() {
						triviaGame.setUp();
						triviaGame.start();
					})
				);
			}
		},

		//Quiz Section
		count: 0, // the index of the currently displaying question.
		correct: 0,
		incorrect: 0,
		unanswered: 0,
		quiz: [],
		currentQuizQuestion: {},
		addQuestion: function(question) {
			console.log("added " + question.questionText + " to " + this.quiz.length);
			this.quiz[this.quiz.length] = question;
		},
		setUp: function () {
			triviaGame.correct = 0;
			triviaGame.incorrect = 0;
			triviaGame.unanswered = 0;
			triviaGame.defaultTime = 5;
			triviaGame.cooldownTime = 5;
			triviaGame.addQuestion(new QuizQuestion("Who is Buzz Lightyear's arch nemesis?", 
							["Zurg", "Darth Vader", "Sid", "Rex"],
							0,
							"http://66.media.tumblr.com/9dbbb1718e57cde144da3c10096d5aa0/tumblr_nb3l3rhkfE1ts97afo1_500.gif"
							));
			triviaGame.addQuestion(new QuizQuestion("How many Pixar films won the Oscar for Best Animated Feature?",
							["3", "8", "5", "11"],
							1,
							"https://media.giphy.com/media/7dQaPwR4hYiIw/giphy.gif"
							));
			triviaGame.addQuestion(new QuizQuestion("A total of five Pixar films are rated PG. Which of the following films is NOT rated PG?",
							["Up", "The Incredibles", "Brave", "WALL-E"],
							3,
							"http://31.media.tumblr.com/3273f1e03ded8e37b97e2c88f72c6495/tumblr_mru8f9jmMf1rnml77o1_500.gif"
							));

			triviaGame.reset();
		}
	}

var intervalID;
window.onload = function () {
	triviaGame.setUp();
	triviaGame.start();
};