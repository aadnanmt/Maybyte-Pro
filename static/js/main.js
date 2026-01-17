// Fungsi mengubah detik jadi format Jam:Menit:Detik
function formatUptime(seconds) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    let result = "";
    if (d > 0) result += d + "d "; // Kalau ada hari, tampilin hari
    if (h > 0) result += h + "h ";
    result += m + "m " + s + "s";
    return result;
}

// ==========================================
// 1. MEMORI GLOBAL (Harus di paling atas!)
// ==========================================
// Taruh di luar fungsi biar dia "ingat" data masa lalu
let lastSent = 0;
let lastRecv = 0;

// ==========================================
// 2. KONFIGURASI CHART DISK
// ==========================================
var diskOptions = {
    series: [100],
    chart: {
        height: 200,
        type: "radialBar",
        offsetY: -10,
    },
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
                name: { fontSize: "16px", color: undefined, offsetY: 120 },
                value: {
                    offsetY: 76,
                    fontSize: "22px",
                    color: "#e2e8f0",
                    formatter: function (val) {
                        return val + "%";
                    },
                },
            },
            hollow: { margin: 0, size: "70%", background: "transparent" },
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            type: "horizontal",
            gradientToColors: ["#3b82f6"],
            stops: [0, 100],
        },
    },
    stroke: { lineCap: "round" },
    colors: ["#06b6d4"],
    labels: ["Storage Used"],
};

// Render Grafik Disk
var diskChart = new ApexCharts(
    document.querySelector("#diskChart"),
    diskOptions,
);
diskChart.render();

// ==========================================
// 3. FUNGSI UTAMA (JANTUNG APLIKASI)
// ==========================================
async function updateDashboard() {
    try {
        // Ambil Data dari Python
        const response = await fetch("/api/stats");
        const data = await response.json();

        // UPDATE DATA CPU & RAM
        if (document.getElementById("cpu-val"))
            document.getElementById("cpu-val").innerText = data.cpu;

        if (document.getElementById("ram-val"))
            document.getElementById("ram-val").innerText = data.ram;

        if (document.getElementById("cpu-bar"))
            document.getElementById("cpu-bar").style.width = data.cpu + "%";

        if (document.getElementById("ram-bar"))
            document.getElementById("ram-bar").style.width = data.ram + "%";

        // Btw, kalau kamu punya chart CPU/RAM lain, update di sini juga

        // --- UPDATE DISK CHART ---
        diskChart.updateSeries([data.disk]);

        // --- UPDATE NETWORK SPEED (LOGIKA BARU) ---
        // Semua logika ini WAJIB ada di DALAM fungsi updateDashboard

        if (lastRecv > 0) {
            // Hitung selisih: (Total Sekarang - Total Tadi) / 1024 biar jadi KB
            const downSpeed = (data.net_recv - lastRecv) / 1024;
            const upSpeed = (data.net_sent - lastSent) / 1024;

            // Tampilkan ke layar
            // Pastikan ID 'down-speed' dan 'up-speed' ada di HTML
            if (document.getElementById("down-speed"))
                document.getElementById("down-speed").innerText =
                    downSpeed.toFixed(1);

            if (document.getElementById("up-speed"))
                document.getElementById("up-speed").innerText =
                    upSpeed.toFixed(1);
            if (document.getElementById("uptime-val"))
                document.getElementById("uptime-val").innerText = formatUptime(
                    data.uptime,
                );
        }

        // PENTING: Simpan data sekarang ke variabel global
        // Biar putaran selanjutnya bisa ngebandingin sama data ini
        lastRecv = data.net_recv;
        lastSent = data.net_sent;
    } catch (error) {
        console.error("Error ambil data:", error);
    }
}

// Jalankan setiap 1 detik (1000ms) biar speed-nya lebih real-time
// Kalau 2000ms (2 detik) nanti angkanya jadi rata-rata 2 detik, kurang greget.
setInterval(updateDashboard, 2000);

// Jalankan sekali pas loading awal
updateDashboard();