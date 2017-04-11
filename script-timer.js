/*
 variables
 */
var selectedMinutes;
var timer;
var minutesSpan = '';
var secondsSpan = '';
var timeinterval = '';
var isPaused = false;
var pausedTime = '';
var deadline = '';
var selectbox;

/*
 get remaining time
 */
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return {
        'total': t,
        'minutes': minutes,
        'seconds': seconds
    };
}

/*
 initialize timer
 */
function initializeTimer(id, selectedMinutes) {
    var clock = document.getElementById(id);
    minutesSpan = clock.querySelector('.minutes');
    secondsSpan = clock.querySelector('.seconds');
    minutesSpan.innerHTML = selectedMinutes >= 10 ? selectedMinutes : '0' + selectedMinutes;
    secondsSpan.innerHTML = '00';
}

/*
 Run timer
 */
function runTimer() {
    console.log("run timer");
    function updateClock() {
        var t = getTimeRemaining(deadline);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        if (t.total <= 0) {
            console.log("FINISH");
            clearInterval(timeinterval);
        }
    }
    updateClock();
    timeinterval = setInterval(updateClock, 1000);
}

/*
 Start Timer
 */
function startTimer() {
    console.log("Start Timer");
    deadline = new Date(Date.parse(new Date()) + timer);
    document.getElementById('minutesSelectbox').disabled = true;
    runTimer();
    isPaused = false;
}

/*
 Pause timer
 */
function pauseTimer() {
    console.log("pause timer");
    if(!isPaused){
        isPaused = true;
        pausedTime = getTimeRemaining(deadline).total; // preserve remaining time
        document.getElementById('minutesSelectbox').disabled = false;
        clearInterval(timeinterval);
        timeinterval = 0;
    }
}

/*
 Resume timer
 */
function resumeTimer(){
    console.log("resume timer");
    if(isPaused){
        deadline = new Date(Date.parse(new Date()) + pausedTime);
        document.getElementById('minutesSelectbox').disabled = true;
        runTimer();
        isPaused = false;
    }
}

/*
 Set timer minutes
 */
function setMinutes() {
    console.log("set timer minutes");
    selectbox = document.getElementById("minutesSelectbox");
    selectedMinutes = selectbox.value;
    timer = selectedMinutes * 60 * 1000;
    initializeTimer('clockdiv', selectedMinutes);
}

window.onload = function (e) {
    setMinutes();
    startFirework();
    loop();
};