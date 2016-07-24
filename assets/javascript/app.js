

window.onload = function () {
	countdownTimer.reset();
	countdownTimer.start();
};

var countdownTimer = {
		time: 0,
		reset: function() {
			console.log("reset");
			countdownTimer.time = 10;
			$("#time-left").html(countdownTimer.time);
		},
		start: function() {
			console.log("start");
			intervalID = setInterval(countdownTimer.tick, 1000);
		},
		stop: function() {
			console.log("stop");
			clearInterval(intervalID);
		},
		tick: function() {
			console.log("tick");
			countdownTimer.time--;
			$("#time-left").html(countdownTimer.time);

			if(countdownTimer.time === 0) {
				countdownTimer.stop();
			}
		},
	}