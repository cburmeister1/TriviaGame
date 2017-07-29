$(document).ready(function() {
	$(".endGame").hide();
	$("#submitResult").hide();
	$(".timeLeft").hide();

	var trivia = [
		{question:"In what year was Major League Baseball founded?",
		choices:["1859", "1869", "1901", "1903"],
		answer:"1869"},

		{question:"What team won the first World Series?",
		choices:["Pittsburg Pirates", "Chicago Cubs", "Boston Americans", "New York Giants"],
		answer: "Boston Americans"},

		{question:"Which player has the most career home runs?",
		choices:["Ken Griffey Jr", "Hank Aaron", "Barry Bonds", "Babe Ruth"],
		answer:"Barry Bonds"},

		{question:"Which team won the 2016 World Series?",
		choices:["Kansas City Royals", "Chicago Cubs", "San Francisco Giants", "New York Yankees"],
		answer: "Chicago Cubs"},

		{question:"What is the oldest active ball park in Major League Baseball?",
		choices:["Fenway Park", "Wrigley Field", "Yankee Stadium", "Dodger Stadium"],
		answer: "Fenway Park"}
	];

var correctAnswers = 0;
var incorrectAnswers = 0;
var timer ;

var startGame = {

	viewQuestions: function() {		
		$(".timeLeft").show();
		$("#instructions").hide();
		for (var i = 0; i < trivia.length; i++) {
			var question = $("<div id='q" + i + " 'class='section'>");
			question.html(trivia[i].question);
			question.attr("trivia-id", i);
			$('#question').append(question);

			for (ctr = 0; ctr < trivia[i].choices.length; ctr++) {
    		var choices = trivia[i].choices[ctr];
    		$('#question').append('\xa0\xa0'+'<input type="radio" name="question' + '-' + i + '" value="'+ trivia[i].choices[ctr] + '"> '+ trivia[i].choices[ctr]);
       		}; 
    	};  
	}, 	

	checkAnswers: function () {
		for (var i = 0; i < trivia.length; i++) {
			var userAnswers = $("input[name='question-" + i +"']:checked");
			if (userAnswers.val() == trivia[i].answer) {
				correctAnswers++;
			} else {
				incorrectAnswers++;
			}
		} 
			startGame.results();
	}, 

	results: function() {
		clearInterval(timer);	
		$("#question").hide();
		$("#submitResult").hide();
		$("#startClock").hide();
		$(".timeLeft").hide();
		$(".endGame").show();
		$('#correctGuesses').append(correctAnswers);
		$('#incorrectGuesses').append(incorrectAnswers);
	},

	startTimer: function() {
	  var counter = 45;
	  timer = setInterval(function() {
	    counter--;
	    if (counter >= 0) {
	      span = document.getElementById("count");
	      span.innerHTML = counter;
	    }
	    if (counter === 0) {
	        alert('Time is Up!');
	        startGame.checkAnswers();
	        results();
	        clearInterval(timer);
	    }
	  }, 1000);
	},
};

	$("#startClock").click(function() {
	    startGame.startTimer();
	    startGame.viewQuestions();
	    $("#startClock").hide();
	    $("#submitResult").show();
	 });

	$("#submitResult").click(function() {
	    startGame.checkAnswers();
	});
});