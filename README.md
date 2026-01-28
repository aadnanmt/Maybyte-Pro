# Maybyte Pro (Reborn)

![Python](https://img.shields.io/badge/Python-3.14-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-Backend-black?style=for-the-badge&logo=flask)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Standalone-38bdf8?style=for-the-badge&logo=tailwindcss)

Maybyte Pro adalah dashboard monitoring sistem *real-time* yang ringan, dibangun dengan arsitektur **MVC (Model-View-Controller)**. Proyek ini didesain untuk memantau performa hardware (CPU, Core, Threads) dengan tampilan modern berbasis Grid Layout.

Fitur unggulan proyek ini adalah **Hybrid Data System**, yang memungkinkan aplikasi berjalan mulus baik di lingkungan lokal (akses hardware penuh) maupun di lingkungan Cloud/Edge (terisolasi).

## 🌟 Key Features

* **Real-time Monitoring:** Menggunakan Fetch API untuk *polling* data CPU setiap 2 detik tanpa reload halaman.
* **Hybrid Mode (Smart Fallback):**
    * **Mode REAL:** Menggunakan library `psutil` untuk mengambil data asli hardware saat dijalankan di Localhost/VPS.
    * **Mode DUMMY:** Otomatis beralih ke simulasi data (Randomizer) jika mendeteksi library `psutil` tidak tersedia atau diblokir (cocok untuk deployment di Vercel/EdgeOne).
* **Mobile-First Design:** Layout responsif menggunakan Tailwind CSS Grid System.
* **No Node_Modules:** Menggunakan Tailwind Standalone CLI, menjaga proyek tetap ringan tanpa ribuan dependensi Node.js.

## 📂 Project Structure

```/
maybyte-pro/
├── app.py                  # Flask Server & API Endpoints
├── monitor.py              # Data Logic
├── tailwind.config.js      # Konfigurasi Tailwind
├── tailwindcss             # Binary Executable (Standalone CLI)
├── requirements.txt        # Dependensi Python
├── src/
│   └── input.css           # Tailwind Directives
├── static/
│   ├── dist/
│   │   └── output.css      # Hasil compile CSS
│   └── js/
│       └── index.js        # Frontend Logic
└── templates/
    └── index.html          # Halaman Utama Dashboard
```

## Installation & Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/aadnanmt/Maybyte-pro.git
    cd Maybyte-pro
    ```

2.  **Create a Virtual Environment on Windows**
    ```bash
    python -m venv venv
    venv\Scripts\activate
    ```
3.  **Create a Virtual Environment on macOS/Linux**
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

4.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Setup TailwindCSS (Pilih OS Kamu)**

    Silakan ikuti langkah-langkah di bawah ini satu per satu sesuai sistem operasi yang kamu gunakan.

    ### Linux (x64)
    
    1.  **Unduh file binary:**
        ```bash
        curl -sLO [https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-linux-x64](https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-linux-x64)
        ```
    2.  **Ganti nama file menjadi `tailwindcss`:**
        ```bash
        mv tailwindcss-linux-x64 tailwindcss
        ```
    3.  **Berikan izin eksekusi:**
        ```bash
        chmod +x tailwindcss
        ```
    4.  **Buat file konfigurasi:**
        ```bash
        ./tailwindcss init
        ```

    ---

    ### macOS (Apple Silicon)
    
    1.  **Unduh file binary:**
        ```bash
        curl -sLO [https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-macos-arm64](https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-macos-arm64)
        ```
    2.  **Ganti nama file menjadi `tailwindcss`:**
        ```bash
        mv tailwindcss-macos-arm64 tailwindcss
        ```
    3.  **Berikan izin eksekusi:**
        ```bash
        chmod +x tailwindcss
        ```
    4.  **Buat file konfigurasi:**
        ```bash
        ./tailwindcss init
        ```

    ---

    ### macOS (Intel Chip)
    
    1.  **Unduh file binary:**
        ```bash
        curl -sLO [https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-macos-x64](https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-macos-x64)
        ```
    2.  **Ganti nama file menjadi `tailwindcss`:**
        ```bash
        mv tailwindcss-macos-x64 tailwindcss
        ```
    3.  **Berikan izin eksekusi:**
        ```bash
        chmod +x tailwindcss
        ```
    4.  **Buat file konfigurasi:**
        ```bash
        ./tailwindcss init
        ```

    ---

    ### Windows (PowerShell)
    
    1.  **Unduh file dan simpan sebagai `tailwindcss.exe`:**
        ```powershell
        Invoke-WebRequest -Uri '[https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-windows-x64.exe](https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-windows-x64.exe)' -OutFile 'tailwindcss.exe'
        ```
    2.  **Buat file konfigurasi:**
        ```powershell
        .\tailwindcss.exe init
        ```

6.  **Run the Application**

    Karena kita menggunakan Tailwind Watcher, kamu perlu menjalankan dua proses secara bersamaan. Buka **dua terminal** berbeda:

    **Terminal 1: Menjalankan Tailwind Watcher (CSS Builder)**
    Biarkan terminal ini terbuka agar CSS selalu ter-update otomatis saat kamu mengedit HTML.
    
    * **Linux/macOS:**
        ```bash
        ./tailwindcss -i src/input.css -o static/dist/output.css --watch
        ```
    * **Windows:**
        ```powershell
        .\tailwindcss.exe -i src/input.css -o static/dist/output.css --watch
        ```

    **Terminal 2: Menjalankan Flask Server (Backend)**
    Gunakan terminal baru untuk menjalankan server Python.
    ```bash
    flask run
    ```

7.  **Access the site**
    Open your browser and go to [http://127.0.0.1:5000](http://127.0.0.1:5000)

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Contact

* **Name:** Adnan Slamet Wibowo
* **Role:** Web Developer & Prompt Designer
* **Email:** aadnanmtcontact@gmail.com
* **LinkedIn:** [Adnan Slamet Wibowo](https://linkedin.com/in/adnan-slamet-wibowo-73906035b)

---
<p align="center">Made with ❤️ and ☕ in Indonesia</p>