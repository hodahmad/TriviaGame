$(document).ready(function () {
    //create objects for the questions and answers, and their relative position in the array.
    var options = [
        {
            question: "What is the largest bone in the human body?", 
            choice: ["Tibia", "Femur", "Fibula", "Skull"],
            answer: 1,
         },
         {
             question: "What is the most populated state in the U.S.?", 
            choice: ["Arizona", "Texas", "Utah", "California"],
            answer: 3,
         }, 
         {
             question: "What year was the first iPhone released?", 
            choice: ["2007", "2003", "2009", "2008"],
            answer: 0,
        }, 
        {
            question: "Which country produces the most coffee in the world?", 
            choice: ["Canada", "Belgium", "Brazil", "Russia"],
            answer: 2,
        }, 
        {
            question: "Which country invented tea?", 
            choice: ["Taiwan", "South Korea", "Japan", "China"],
            answer: 3,
        }, 
        {
            question: "What genre of music did Taylor Swift start with?", 
            choice: ["Pop", "Country", "Indie", "Rock"],
            answer: 1,
        }, 
        {
            question: "How many eyes does a bee have?", 
            choice: ["3", "5", "2", "4"],
            answer: 1,
        }, 
        {
            question: "When will the next full moon occur on Halloween?", 
            choice: ["2020", "2039", "2025", "2030"],
            answer: 0,
        }];

    //create variables for the correct answers, wrong answers, and how many were unanswered
            var correctCount = 0;
            var wrongCount = 0;
            var unansweredCount = 0;
            var userGuess ="";

    //create variables for the timer and interval
            var timer = 30;
            var intervalId;

    // create a variable for the answer choices array so that it can be used to derive whether the answer is right or wrong
            var running = false;
            var qCount = options.length;
            var pick;
            var index;
            var newArray = [];
            var holder = [];
    
    //create the function to start the game and timer by clicking "Start!" button. On reset, it should begin again.
    
    $("#reset").hide();

    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //function to start the timer and begin to count downwards when the timer begins 
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown function
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
     //the timer should stop after it hits zero, and the unanswered questions should go up 
        if (timer === 0) {
            unansweredCount++;
            stop();
            $("#answerblock").html("<p>Time's up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop and should reset 
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    // create a loop to loop through the choices when the question is displayed 
    function displayQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	go through answer array and display "pick.choice.length" and append answer choices 

      $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    }
    
    //"on click" when user selects the answer 
    $(".answerchoice").on("click", function () {
        //use parseInt to obtain user's guess from the array
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //use if else to increase the correct or incorrect count based on if the user answered correctly or not
        //to ensure that the user cannot select more than one answer, have incorrect or correct appear right away
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1); 
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 30;
    
        //at the end of the trivia quiz, show the screen that displays the score 
        if ((wrongCount + correctCount + unansweredCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unansweredCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unansweredCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })