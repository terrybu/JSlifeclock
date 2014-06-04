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
};
*/
function calculate(age) {
	//get contents of the age box
	var time = age * 18;
	var minuteMark = time % 60;
	var hourMark = Math.floor((time-minuteMark)/60);
	//setting PM hourmark so it shows 1:15pM instead of 13:15PM
	if (hourMark > 12) {
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
	if (age > 3 && hourMark < 12) {
		result.innerHTML = clockAM;
	}
	else if (age <= 3) {
		result.innerHTML = "12:" + paddingMinute + " AM";
	}
	else {
		result.innerHTML = clockPM;
	}
	//these conditions make appropriate comments appear at the appropriate times
	if (age >= 0 && age < 5) {
		comments.innerHTML = "Are you a baby? ;)";
	}
	if (age >= 5 && hourMark < 6) {
		comments.innerHTML = "It is early morning time. Most people are still asleep. There's no need to hurry.";
	}
	if (hourMark >= 6 && hourMark < 10) {
		comments.innerHTML = "Morning has just started. Some people are just barely waking up. You still have your entire day ahead of you. There's no need to think it's too late to do something!";
	}
	if (hourMark >=  10 && hourMark < 12) {
		comments.innerHTML = "You have just started your work day. There's a plenty of time left to change direction or accomplish so much more.";
	}
	if (hourMarkPM >= 0 && hourMarkPM <= 5) {
		comments.innerHTML = "It's the afternoon. Isn't there so much left you want to do? It's also a great time to think about what to do in the evening.";
	}
	if (hourMarkPM >= 6 && hourMarkPM <= 12) {
		comments.innerHTML = "How will you spend the rest of this evening? Isn't there still so much you want to do?"
	}

	document.getElementById('result').appendChild(result); 
	$("#result").show();
	$("#result").after(comments);
}


function rearrange() {
	//get rid of previous screen and load the RESULT sections
	var x = document.getElementById('disappear');
	x.style.display="none";
	var resetButton = document.createElement("button");
	resetButton.setAttribute("id", "reset");
	resetButton.setAttribute("class", "btn btn-primary btn-lg btn-success");
	resetButton.innerHTML = "Back";
	$("#comments").after(resetButton);
	resetButton.onclick = function () {
		window.location.reload();
	};
}

function playclip() {
if (navigator.appName == "Microsoft Internet Explorer") {
if (document.all)
 {
  document.all.sound.src = "dcoin.wav";
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
});
