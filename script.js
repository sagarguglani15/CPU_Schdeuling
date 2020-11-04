const status = document.getElementById("status");
const cvs = document.getElementById("cvs");
const task = document.getElementById("menu");
const taskStatus = document.getElementById("taskStatus");
const btn = document.getElementById("btn").addEventListener('click', perform);

const ctx = cvs.getContext("2d");

CanvasRenderingContext2D.prototype.roundedRectangle = function (x, y, width, height, rounded) {
    const radiansInCircle = 2 * Math.PI
    const halfRadians = (2 * Math.PI) / 2
    const quarterRadians = (2 * Math.PI) / 4

    // top left arc
    this.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true)

    // line from top left to bottom left
    this.lineTo(x, y + height - rounded)

    // bottom left arc  
    this.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true)

    // line from bottom left to bottom right
    this.lineTo(x + width - rounded, y + height)

    // bottom right arc
    this.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true)

    // line from bottom right to top right
    this.lineTo(x + width, y + rounded)

    // top right arc
    this.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true)

    // line from top right to top left
    this.lineTo(x + rounded, y)
}

const statusBar = {
    progress: 1,
    x: 0,
    y: 0
}

let i;
let start;

function perform(e) {

    statusBar.progress = 1;
    i = 0;
    start = Date.now();
    status.innerHTML = "Processing...";
    
    if (task.value === "setTimeout") {
        complexTask_st();
    } else if (task.value === "Promise") {
        complexTask_p();
    } else if (task.value === "RAF") {
        complexTask_raf();
    } else if (task.value === "QueueMicroTask") {
        complexTask_qmt();
    }
}


function changeStatus(s) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    if (s === 1) {
        status.innerHTML = "Completed !  ";
    } else {
        if (status.innerHTML == "Processing...") {
            status.innerHTML = "Processing   ";
        } else if (status.innerHTML == "Processing   ") {
            status.innerHTML = "Processing.  ";
        } else if (status.innerHTML == "Processing.  ") {
            status.innerHTML = "Processing.. ";
        } else {
            status.innerHTML = "Processing...";
        }
    }

    ctx.beginPath();
    ctx.roundedRectangle(0, 0, cvs.width * (statusBar.progress / 1000), cvs.height, 0);
    ctx.fillStyle = "#00ff00";
    ctx.fill();
    ctx.closePath();
}


function complexTask_st() {
    do {
        i++;
    } while (i % 1e6 != 0)

    if (i === 1e9) {
        statusBar.progress += 1;
        changeStatus(1);
        taskStatus.innerHTML = `completed in ${(Date.now() - start) / 1000} seconds`;
    } else {
        statusBar.progress += 1;
        changeStatus(0);
        taskStatus.innerHTML = `currently at ${i}`;
        setTimeout(complexTask_st);
    }
}

function complexTask_p() {
    do {
        i++;
    } while (i % 1e6 != 0)

    if (i === 1e9) {
        statusBar.progress += 1;
        changeStatus(1);
        taskStatus.innerHTML = `completed in ${(Date.now() - start) / 1000} seconds`;
    } else {
        statusBar.progress += 1;
        changeStatus(0);
        taskStatus.innerHTML = `currently at ${i}`;
        Promise.resolve().then(complexTask_p);
    }
}

function complexTask_raf() {
    do {
        i++;
    } while (i % 1e6 != 0)

    if (i === 1e9) {
        statusBar.progress += 1;
        changeStatus(1);
        taskStatus.innerHTML = `completed in ${(Date.now() - start) / 1000} seconds`;
    } else {
        statusBar.progress += 1;
        changeStatus(0);
        taskStatus.innerHTML = `currently at ${i}`;
        requestAnimationFrame(complexTask_raf);
    }
}

function complexTask_qmt() {
    do {
        i++;
    } while (i % 1e6 != 0)

    if (i === 1e9) {
        statusBar.progress += 1;
        changeStatus(1);
        taskStatus.innerHTML = `completed in ${(Date.now() - start) / 1000} seconds`;
    } else {
        statusBar.progress += 1;
        changeStatus(0);
        taskStatus.innerHTML = `currently at ${i}`;
        queueMicrotask(complexTask_qmt);
    }
}
