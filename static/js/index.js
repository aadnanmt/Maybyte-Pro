async function updateDashboard() {
    try {
        // request data server (be-python)
        let response = await fetch('/api/stats');

        // change data server to  object js
        let data = await response.json();

        // change interface use DOM
        document.getElementById('cpu-val').innerText = data.cpu;
        document.getElementById('core-val').innerText = data.core;
        document.getElementById('thread-val').innerText = data.cpu_threads;
        document.getElementById('status-msg').innerText = data.status;
        document.getElementById('mode').innerText = data.mode;

    } catch (error) {
        console.log("Waduh error cuy: ", error);
    }
}

// running updateDashboard every 2 seconds, u can change
setInterval(updateDashboard, 2000);
updateDashboard();