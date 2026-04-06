// header
import { Fetch } from './module/config.js';

async function updateData() {
    try {
        const response = await fetch('/api/stats', Fetch);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = await response.json();

        // change interface use DOM native js :>

        // CPU
        document.getElementById('cpu-val').innerText = data.cpu;
        document.getElementById('cpu-msg').innerText = data.status_msg;
        document.getElementById('core-val').innerText = data.core;
        document.getElementById('thread-val').innerText = data.cpu_threads;

        // Status Information
        document.getElementById('status-msg').innerText = data.status;
        document.getElementById('mode').innerText = data.mode;

        // RAM
        document.getElementById('ram-val').innerText = data.ram_percent;
        document.getElementById('ram-available').innerText = data.ram_available;
        document.getElementById('ram-used').innerText = data.ram_used;
        document.getElementById('ram-total').innerText = data.ram_total;

        // DISK
        document.getElementById('disk-val').innerText = data.disk_percent;
        document.getElementById('disk-available').innerText = data.disk_available;
        document.getElementById('disk-used').innerText = data.disk_used;
        document.getElementById('disk-total').innerText = data.disk_total;

    } catch (error) {
        console.log("Huftt, Error: ", error);
    }
}

// running updateData every 1 seconds, u can change :>
setInterval(updateData, 1000);
updateData();
