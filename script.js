const status = document.getElementById("status");
const cvs = document.getElementById("cvs");
const task = document.getElementById("menu");
const taskStatus = document.getElementById("taskStatus");
const btn = document.getElementById("btn");

const ctx = cvs.getContext("2d");

btn.addEventListener('click', perform);

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
let fibo;
let method;

function perform(e) {

    statusBar.progress = 1;
    i = 0;
    start = Date.now();
    status.innerHTML = "Processing...";
    fibo = [];
    btn.disabled = true;
    method = task.value;

    if( method === "Fibonacci"){
        complexTask_fibo();
    }else{
        complexTask();
    }
}

function complexTask(){
    do {
        i++;
    } while (i % 1e6 != 0)

    if (i === 1e9) {
        statusBar.progress += 1;
        changeStatus(1, 1000);
        taskStatus.innerHTML = `completed in ${(Date.now() - start) / 1000} seconds`;
        btn.disabled = false;
    } else {
        statusBar.progress += 1;
        changeStatus(0, 1000);
        taskStatus.innerHTML = `currently at ${i}`;

        if (method === "setTimeout") {
            setTimeout(complexTask);
        } else if (method === "Promise") {
            Promise.resolve().then(complexTask);
        } else if (method === "RAF") {
            requestAnimationFrame(complexTask);
        } else if (method === "QueueMicroTask") {
            queueMicrotask(complexTask);
        }
    }
}

function changeStatus(s, limit) {
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
    ctx.roundedRectangle(0, 0, cvs.width * (statusBar.progress / limit), cvs.height, 0);
    ctx.fillStyle = "#00ff00";
    ctx.fill();
    ctx.closePath();
}

function complexTask_fibo(){
    do {
        if(i==0){
            fibo.push(0);
        }else if(i==1){
            fibo.push(1);
        }else{
            fibo.push( fibo[i-2] + fibo[i-1] );
        }
        i++;
    } while (i % 1000 != 0)

    if (i === 1000000) {
        statusBar.progress += 1;
        changeStatus(1, 1000);
        taskStatus.innerHTML = `completed in ${(Date.now() - start) / 1000} seconds`;
        status.innerHTML = `Completed! with ${fibo.length} terms!`
        btn.disabled = false;
    } else {
        statusBar.progress += 1;
        changeStatus(0, 1000);
        taskStatus.innerHTML = `currently at ${i}`;
        setTimeout(complexTask_fibo);
    }
}
