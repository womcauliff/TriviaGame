/**
 * QuizQuestion Constructor
 */
function QuizQuestion(questionText, answers, solutionIndex, img) {
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
 * One section of the Trivia Game Object 
 * controls the StopWatch for the game,
 * while a second section controls the Quiz Question and Answer Logic.
 */
var triviaGame = {

    /********************
     * StopWatch Section
     ********************/
    defaultTime: 0,
    currentTime: 0,
    cooldownTime: 0,
    /**
     * triviaGame.reset()
     */
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
                    console.log($(this).data("qid") +
                        "clicked" + this);
                    triviaGame.stop();
                    var result = "";
                    if ($(this).data("qid") == triviaGame.currentQuizQuestion.solutionIndex) {
                        result = "correct!";
                        triviaGame.correct++;
                    } else {
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
    /**
     * triviaGame.displayAnswer()
     */
    displayAnswer: function() {
        $("#answers").append(
            $('<img>')
            .attr('src', triviaGame.currentQuizQuestion.img)
        );
        $("#answers").append(
            $("<p>").text("The answer is " +
                triviaGame.currentQuizQuestion.answers[triviaGame.currentQuizQuestion.solutionIndex])
        );
        setTimeout(triviaGame.advance, triviaGame.cooldownTime * 1000);
    },
    /**
     * triviaGame.start()
     */
    start: function() {
        console.log("start");
        intervalID = setInterval(triviaGame.tick, 1000);
    },
    /**
     * triviaGame.stop()
     */
    stop: function() {
        console.log("stop");
        clearInterval(intervalID);
        $("#question").html("");
        $("#answers").empty();
    },
    /**
     * triviaGame.tick()
     */
    tick: function() {
        console.log("tick");
        triviaGame.currentTime--;
        $("#time-left").html(triviaGame.currentTime);

        //Ran out of time for question
        if (triviaGame.currentTime === 0) {
            console.log("Time's Up.");
            triviaGame.stop();
            triviaGame.unanswered++;
            triviaGame.displayAnswer();
        }
    },
    /**
     * triviaGame.advance()
     */
    advance: function() {
        console.log("advance");
        triviaGame.count++;

        //if there is another quiz question to ask
        if (triviaGame.count < triviaGame.quiz.length) {
            triviaGame.reset();
            triviaGame.start();
        } 
        //else, update UI with quiz results
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
                    triviaGame.setUp(25, 5);
                    triviaGame.start();
                })
            );
        }
    },

    /********************
     * Quiz Section
     ********************/
    count: 0, // the index of the currently displaying question.
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    quiz: [],
    currentQuizQuestion: {},

    /**
     * triviaGame.addQuestion()
     * 
     * @param {Object} the QuizQuestion Object to be added to the internal array, quiz[]
     */
    addQuestion: function(question) {
        console.log("added " + question.questionText + " to " + this.quiz.length);
        this.quiz[this.quiz.length] = question;
    },
    /**
     * triviaGame.setUp()
     *
     * Initializes the values for the triviaGame object.
     *
     * @param {number} defaultTime the time in seconds to answer a question
     * @param {number} cooldownTime the time in seconds that the answer will display
     */
    setUp: function(defaultTime, cooldownTime) {
    	triviaGame.count = 0;
        triviaGame.correct = 0;
        triviaGame.incorrect = 0;
        triviaGame.unanswered = 0;

        triviaGame.defaultTime = defaultTime;
        triviaGame.cooldownTime = cooldownTime;

        triviaGame.reset();
    }
}

var intervalID;
window.onload = function() {

	//Using QuizQuestion Constructor, add questions to TriviaGame Object
    triviaGame.addQuestion(new QuizQuestion("Who is Buzz Lightyear's arch nemesis?", ["Zurg", "Darth Vader", "Sid", "Rex"], 0, "assets/images/zurg.gif"));
    triviaGame.addQuestion(new QuizQuestion("How many Pixar films won the Oscar for Best Animated Feature?", ["3", "8", "5", "11"], 1, "assets/images/insideout-cheering.gif"));
    triviaGame.addQuestion(new QuizQuestion("A total of five Pixar films are rated PG. Which of the following films is rated G?", ["Up", "The Incredibles", "Brave", "WALL-E"], 3, "assets/images/wall-e.gif"));

    $("#startbutton").on("click", function() {
        triviaGame.setUp(25, 5);
        $("#gamearea").css('visibility', 'visible');
        triviaGame.start();
        $("#startbutton").remove();
    })

};