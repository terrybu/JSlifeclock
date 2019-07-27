var ageField = document.getElementById("inputActualKorean");

//clear input box when clicked
ageField.onfocus = function() {
		ageField.value = "";
};

//put placeholder back into input box when clicked out
ageField.onblur = function() {
	if (ageField.value == "") {
		ageField.value = "나이를 입력하세요 (만1~80세)";
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
	var age = document.getElementById("inputActualKorean").value;
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
	if (minuteMark == 0) {
		var minuteMarkCheck = "";
	}
	else {
		var minuteMarkCheck = minuteMark;
	}
	
	//finalizing result variables with colons and AM/PM signs
	var clockEarlyMorning = "새벽 " + hourMark + "시 " + minuteMarkCheck + "분";
	var clockMorning = "아침 " + hourMark + "시 " + minuteMarkCheck + "분";
	var clockAfternoon = "오후 " + hourMarkPM + "시 " + minuteMarkCheck + "분";
	var clockNight = "저녁 " + hourMarkPM + "시 " + minuteMarkCheck + "분";
	// create the element and store it in a variable
	var result = document.createElement("p");
	var comments = document.createElement("p");
	comments.setAttribute("id", "comments");
	//this shows 12:15AM instead of 0:15AM and sets rules for displaying the right times
	if (hourMark == 0) {
		result.innerHTML = "밤 12시 " + minuteMarkCheck + "분";
	}
	else if (hourMark >= 1 && hourMark < 6) {
		result.innerHTML = clockEarlyMorning;
	}
	else if (hourMark >= 6 && hourMark < 12) {
		result.innerHTML = clockMorning;
	}
	else if (age == 40) {
		result.innerHTML = "정오 12시";
	}
	else if (age != 40 && hourMark == 12) {
		result.innerHTML = "오후 12시" + minuteMarkCheck + "분";
	}
	else if (hourMarkPM >= 1 && hourMarkPM < 6) {
		result.innerHTML = clockAfternoon;
	}
	else if (hourMarkPM >= 6 && hourMarkPM < 12) {
		result.innerHTML = clockNight;
	}
	else {
		result.innerHTML = "&#8734";
	}
	//these conditions make appropriate comments appear at the appropriate times
	if (age >= 0 && age < 5) {
		comments.innerHTML = "갓난 아기세요? ㅋㅋㅋ ;)";
	}
	else if (age >= 5 && hourMark < 6) {
		comments.innerHTML = "대부분의 사람들은 잠을 자고 있는 좋은 시기입니다. 지금의 시간을 유용히 쓰시고 많은 것을 배우세요.";
	}
	else if (hourMark >= 6 && hourMark <= 9) {
		comments.innerHTML = "아침이 겨우 시작했습니다. 등교나 출근을 아직 안했거나 잠을 자고 있어도 이상하지 않을 시간입니다. 남은 시간은 많습니다. 성급해하지 마시고 천천히 일어나세요.";
	}
	else if (hourMark >=  10 && hourMark < 12) {
		comments.innerHTML = "아직도 아침입니다. 오후와 밤에 무엇을 할지 생각하기에 좋은 시간입니다. 남은 시간은 많습니다.";
	}
	else if (hourMarkPM >= 0 && hourMarkPM <= 2) {
		comments.innerHTML = "아침은 끝났지만 남은 시간은 많습니다. 지금까지 쉬지않고 달려 오셨다면 잠시 점심시간을 갖는것도 좋지 않을까요? 남은 오후 내내 무엇을 하고싶으세요? ";
	}
	else if (hourMarkPM >= 3 && hourMarkPM <= 6) {
		comments.innerHTML = "당신은 자신의 일에 만족하십니까? 남은 시간은 많습니다. 당신의 밤은 어떻게 보내고 싶으세요?";
	}
	else if (hourMarkPM >= 7 && hourMarkPM <= 11) {
		comments.innerHTML = "당신은 남은 밤을 어떻게 보내고 싶으십니까? 남은 시간은 많습니다. 아직 잠을 자기에는 너무 이르지 않습니까? 하고 싶은 일들이 너무 많으시지 않습니까?"
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
	if (age <= 70) {
	ageDisplay.innerHTML = "당신은 만 " + age + "세 입니다. 평균수명을 80세로 계산했을 때, 당신의 남은 시간은 " + formatHour + " 시간입니다." + "<br> 말콤 글래드웰의 '1만 시간의 법칙'에 의하면 어느 한 분야의 전문가가 되기 위해서는 10년간 일주일에 3시간씩 연습이 필요하다고 합니다. 당신은 남은 시간안에 " + Math.floor((80-age)/10) + "가지 분야의 전문가가 될 수 있습니다.";
	}
	else if (age == 80) {
		ageDisplay.innerHTML = "";
	}
	else {
	ageDisplay.innerHTML = "당신은 만 " 
	+ age + "세 입니다. 평균수명을 80세로 계산했을 때, 당신의 남은 시간은 " + formatHour + " 시간입니다." ; 
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
	resetButton.innerHTML = "Reset";
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