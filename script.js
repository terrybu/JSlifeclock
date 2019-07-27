var ageField = document.getElementById("inputActual");

//clear input box when clicked
ageField.onfocus = function() {
		ageField.value = "";
};

//put placeholder back into input box when clicked out
ageField.onblur = function() {
	if (ageField.value == "") {
		ageField.value = "Input Your Age (1-80)";
	}
};

//global variables ... just don't use them in anonoymous functions
var submitButton = document.getElementById("submit");
var errorMsg = document.getElementById("errorMsg");


$("#submit").click(function() {
	var userInput = ageField.value;
        if (!isNaN(userInput) && userInput > 0 && userInput <= 80) {
    		errorMsg.style.display="none"; 	
        	calculate(userInput);
        	rearrange();
        	playclip();
    	}
    	else {
    		errorMsg.style.display="";
    	}
});

/* old javscript code replaced by jQuery 
submitButton.onclick = function () {
		var userInput = ageField.value;
        if (!isNaN(userInput) && userInput > 0 && userInput <= 80) {
    		errorMsg.style.display="none";
        	alert("input correct and submit button clicked, run calculate");
        	calculate(userInput);
        	rearrange();
    	}
    	else {
    		errorMsg.style.display="";
    	}
};*/


//CLOCK DISPLAY CODES
function displayTime() {
	var age = document.getElementById("inputActual").value;
	var time = age * 18;
	var minuteMark = time % 60;
	var hourMark = Math.floor((time-minuteMark)/60);
    var h = hourMark;
    var m = minuteMark;
    var s = 0;
       
    // --- Analog clock ---//
    var canvas = document.querySelector("#clock");
    var context = canvas.getContext("2d");
     
    // You can change this to make the clock as big or small as you want.
    // Just remember to adjust the canvas size if necessary.
    var clockRadius = 100;
     
    // Make sure the clock is centered in the canvas
    var clockX = canvas.width / 2;
    var clockY = canvas.height / 2;
     
    // Make sure TAU is defined (it's not by default)
    Math.TAU = 2 * Math.PI;
     
	function drawArm(progress, armThickness, armLength, armColor) {
	    var armRadians = (Math.TAU * progress) - (Math.TAU/4);
	    var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
	    var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);
	 
	    context.lineWidth = armThickness;
	    context.strokeStyle = armColor;
	 
	    context.beginPath();
	    context.moveTo(clockX, clockY); // Start at the center
	    context.lineTo(targetX, targetY); // Draw a line outwards
	    context.stroke();
	}

	drawArm(h / 12, 10, 0.50, '#ab7b33'); // Hour
	drawArm(m / 60,  4, 0.75, '#ab7b33'); // Minute
}

	function padZero(num) {
	    if (num < 10) { 
	        return "0" + String(num);
	    }
	    else {
	        return String(num);
	    }
	}

	function formatHour(h) {
	    var hour = h % 12;
	 
	    if (hour == 0) { 
	        hour = 12; 
	    }
	     
	    return String(hour)
	}

	function getTimePeriod(h) {
	    return (h < 12) ? "AM" : "PM"; 
	}


function calculate(age) {
	//get contents of the age box
	var time = Math.floor(age) * 18;
	var minuteMark = time % 60;
	var hourMark = Math.floor((time-minuteMark)/60);
	//setting PM hourmark so it shows 1:15pM instead of 13:15PM
	if (hourMark >= 12) {
		var hourMarkPM = hourMark - 12;
	}
	//sets padding so it looks 7:05 instead of 7:5 
	if (minuteMark < 10) {
		var paddingMinute = "0" + minuteMark.toString();
	}
	else {
		var paddingMinute = minuteMark.toString();
	}
	//finalizing result variables with colons and AM/PM signs
	var clockAM = hourMark + ":" + paddingMinute + " AM";
	var clockPM = hourMarkPM + ":" + paddingMinute + " PM";
	// create the element and store it in a variable
	var result = document.createElement("p");
	var comments = document.createElement("p");
	comments.setAttribute("id", "comments");
	//this shows 12:15AM instead of 0:15AM and sets rules for displaying the right times
	if (hourMark < 1) {
		result.innerHTML = "12:" + paddingMinute + " AM";
	}
	else if (hourMark >= 1 && hourMark < 12) {
		result.innerHTML = clockAM;
	}
	else if (hourMarkPM == 0) {
		result.innerHTML = "12:" + paddingMinute + " PM";
	}
	else if (hourMarkPM >= 1 && hourMarkPM < 12) {
		result.innerHTML = clockPM;
	}
	else {
		result.innerHTML = "&#8734";
	}
	//these conditions make appropriate comments appear at the appropriate times
	if (age >= 0 && age < 5) {
		comments.innerHTML = "Are you a baby? ;)";
	}
	else if (age >= 5 && hourMark < 6) {
		comments.innerHTML = "It is early morning time. Most people are still asleep. There's no need to hurry.";
	}
	else if (hourMark >= 6 && hourMark <= 9) {
		comments.innerHTML = "Morning has just started. Some people are just barely waking up. You still have your entire day ahead of you. There's absolutely no need to believe it's too late to do something!";
	}
	else if (hourMark >=  10 && hourMark < 12) {
		comments.innerHTML = "You have just started your work day. There's a plenty of time left to change direction or accomplish so much more.";
	}
	else if (hourMarkPM >= 0 && hourMarkPM <= 2) {
		comments.innerHTML = "You have your whole day in front of you. If you've spent all morning working hard, maybe a short lunch break is in order ;)";
	}
	else if (hourMarkPM >= 3 && hourMarkPM <= 6) {
		comments.innerHTML = "A plenty of time left in the afternoon and evening. Isn't there still so much left you want to accomplish? What kind of plans do you have for the evening?";
	}
	else if (hourMarkPM >= 7 && hourMarkPM <= 11) {
		comments.innerHTML = "How will you spend the rest of the evening? Isn't there still so much you want to do? Maybe it's too early to call it a night just yet?"
	}
	else {
		comments.innerHTML = "It is never too late."
	}

	var clockCanvas = document.createElement("canvas");
	clockCanvas.setAttribute("id","clock");
	clockCanvas.width = 200;
	clockCanvas.height = 205;
	//insert clockCanvas after the H1 tag
	$('h1').after(clockCanvas);
	displayTime();

	//DISPLAY PART MAMURI
	document.getElementById('result').appendChild(result); 
	$("#result").show();
	$(".well").append(comments);
	$(".well").show();
	var ageDisplay = document.createElement("p");
	ageDisplay.setAttribute("id","ageDisplay");
	var hourCalculation = ((80-age)*365*24);
	var formatHour = formatNumber(hourCalculation);
	if (age <= 60) {
	ageDisplay.innerHTML = "You are " 
	+ age + " years old. Using 80 as average life expectancy, you have " 
	+ formatHour + " hours remaining." + 
	"<br> *Author Malcolm Gladwell stated in 'Outliers' that you need 10,000 hours to master a <a href=http://en.wikipedia.org/wiki/List_of_academic_disciplines_and_sub-disciplines target=_blank>discipline</a>.<br> If you were to study/practice 3 hours everyday for 10 years, you have enough time to master " + Math.floor((80-age)/10) + " <a href=http://en.wikipedia.org/wiki/List_of_academic_disciplines_and_sub-disciplines target=_blank>disciplines</a>.";
	}
	else if (age >= 61 && age <= 70) {
	ageDisplay.innerHTML = "You are " 
	+ age + " years old. Using 80 as average life expectancy, you have " 
	+ formatHour + " hours remaining." + 
	"<br> *Author Malcolm Gladwell stated in 'Outliers' that you need 10,000 hours to master a <a href=http://en.wikipedia.org/wiki/List_of_academic_disciplines_and_sub-disciplines target=_blank>discipline</a>.<br> If you were to study/practice 3 hours everyday for 10 years, you have enough time to master " + Math.floor((80-age)/10) + " <a href=http://en.wikipedia.org/wiki/List_of_academic_disciplines_and_sub-disciplines target=_blank>discipline</a>.";
	}
	else if (age == 80) {
		ageDisplay.innerHTML = "";
	}
	//So that the Malcolm Gladwell bit doesn't show when there's less than 10,000 hours remaining for older people
	else {
	ageDisplay.innerHTML = "You are " + age + " years old. Using 80 as average life expectancy, you have " 
	+ formatHour + " hours remaining."
	}

	$(".well").after(ageDisplay);
}

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

function rearrange() {
	//get rid of previous screen and load the RESULT sections
	var x = document.getElementById('disappear');
	x.style.display="none";
	var resetButton = document.createElement("button");
	resetButton.setAttribute("id", "resetButton");
	resetButton.setAttribute("class", "btn btn-primary btn-lg btn-success");
	resetButton.innerHTML = "Start Over";
	$("#ageDisplay").after(resetButton);
	resetButton.onclick = function () {
		window.location.reload();
	};
}

function playclip() {
	if (navigator.appName == "Microsoft Internet Explorer") {
	if (document.all)
	 {
	  document.all.sound.src = "button.wav";
	 }
	}

	else {
	{
	var audio = document.getElementsByTagName("audio")[0];
	audio.play();
	}
	}
}

$(document).ready(function() {
	$("#result").hide();
	$(".well").hide();
});

function goBack() {
	window.history.back();
}