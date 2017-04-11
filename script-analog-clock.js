var clockCount = 0;

function Clock() {
    this.canvas = '';
    this.ctx = '';
    this.radius = '';
    this.timeIsSet = false;
}

Clock.prototype.drawClock = function (element, setTime, headline) {
    console.log("draw clock");
    this.timeIsSet = true;
    this.canvas = document.getElementById(element);
    this.ctx = this.canvas.getContext("2d");
    this.radius = this.canvas.height / 2;
    this.ctx.translate(this.radius, this.radius);
    this.radius = this.radius * 0.90;
    this.drawFace(this.ctx, this.radius);
    this.drawNumbers(this.ctx, this.radius);
    this.drawTime(this.ctx, this.radius, setTime, headline);
};

Clock.prototype.drawFace = function (ctx, radius) {
    var grad;
    ctx.setTransform(1, 0, 0, 1, this.canvas.width / 2, this.canvas.height / 2);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#002878');
    grad.addColorStop(1, '#002878');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#002878';
    ctx.fill();
    var fuxImg = document.getElementById("fux-img");
    ctx.globalAlpha = 0.4;
    ctx.drawImage(fuxImg, -64, -80, 128, 180);
    ctx.globalAlpha = 1;
};

Clock.prototype.drawNumbers = function (ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
};

Clock.prototype.drawTime = function (ctx, radius, setTime, headline) {
    var now;
    var inputTime = document.getElementById(setTime);
    var headlineValue = document.getElementById(headline);
    if (this.timeIsSet && inputTime.value) {
        now = new Date();
        headlineValue.textContent = inputTime.value + ' Uhr';
        var splittedTime = inputTime.value.split(':');
        now.setHours(splittedTime[0]);
        now.setMinutes(splittedTime[1]);
        now.setSeconds(0);
    } else {
        now = new Date();
        var hours = now.getHours() > 9 ? now.getHours() : '0' + now.getHours();
        var minutes = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();
        var isoTime = hours + ':' + minutes;
        inputTime.value = isoTime;
        headlineValue.textContent = isoTime + ' Uhr';
    }
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    // second = (second * Math.PI / 30);
    // drawHand(ctx, second, radius * 0.9, radius * 0.02);

    timeIsSet = false;
};

Clock.prototype.drawHand = function (ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
};

function setTimeClock(count) {
    var newClock = new Clock();
    newClock.drawClock("canvas" + count, "myTime" + count, "headline" + count);
}

function addNewClock() {
    console.log(clockCount);
    if (clockCount < 4) {
        clockCount++;
        var parentElement = document.getElementById("analog-clock");
        var element = '<div><h2>' + clockCount + '. Fütterung</h2> <h3 id="headline' + clockCount + '">-</h3><canvas id="canvas' + clockCount + '" width="400" height="400"></canvas> <br/><input type="time" id="myTime' + clockCount + '" step="60" value=""><br/> <button class="set-time" type="button" onclick="setTimeClock(' + clockCount + ');">Set time</button></div>';
        parentElement.insertAdjacentHTML('beforeend', element);
        document.getElementById("removeClockBtn").disabled = false;
    }
    if(clockCount == 4) {
        document.getElementById("addClockBtn").disabled = true;
    }
}

function removeClock() {
    console.log("remove", clockCount);
    if (clockCount > 0) {
        console.log(clockCount);
        var parentElement = document.getElementById("analog-clock");
        clockCount--;
        parentElement.lastElementChild.remove();
        document.getElementById("addClockBtn").disabled = false;
    }
    if (clockCount == 0) {
        document.getElementById("removeClockBtn").disabled = true;
    }
}