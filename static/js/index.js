async function updateDashboard() {
    try {
        // request data server (be-python)
        let response = await fetch('/api/stats');

        // change data server to  object js
        let data = await response.json();

        // change interface use DOM
        document.getElementById('cpu-val').innerText = data.cpu;
        document.getElementById('cpu-msg').innerText = data.status_msg;
        document.getElementById('core-val').innerText = data.core;

        document.getElementById('thread-val').innerText = data.cpu_threads;
        document.getElementById('status-msg').innerText = data.status;
        document.getElementById('mode').innerText = data.mode;

        document.getElementById('ram-val').innerText = data.ram_percent;
        document.getElementById('ram-available').innerText = data.ram_available;
        document.getElementById('ram-used').innerText = data.ram_used;
        document.getElementById('ram-total').innerText = data.ram_total;

        document.getElementById('disk-val').innerText = data.disk_percent;
        document.getElementById('disk-available').innerText = data.disk_available;
        document.getElementById('disk-used').innerText = data.disk_used;
        document.getElementById('disk-total').innerText = data.disk_total;

    } catch (error) {
        console.log("Waduh error cuy: ", error);
    }
}

// running updateDashboard every 2 seconds, u can change
setInterval(updateDashboard, 2000);
updateDashboard();