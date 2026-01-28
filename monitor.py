# import psutil
import random

try:
    import psutil

    MODE_ASLI = True

except ImportError:

    MODE_ASLI = False 

def ambil_data_cpu():
    data = {}

    if MODE_ASLI:
        cpu_percent = psutil.cpu_percent(interval=None)
        core = psutil.cpu_count(logical=False)
        threads = psutil.cpu_count(logical=True)

        data = {
            "cpu": cpu_percent,
            "core": core,
            "cpu_threads": threads,
            "status": "Running on Hardware",
            "mode": "DATA REAL"
        }
    
    else:
        fake_cpu = random.randint(5, 96)

        data = {
            "cpu": fake_cpu,
            "core": 6,
            "cpu_threads": 12,
            "status": "Running on Data Dummy",
            "mode": "DATA FAKE {DUMMY}"
        }

    if data["cpu"] < 50:
        data["status_msg"] = "Aman terkendali cuyy"
    elif data["cpu"] < 80:
        data["status_msg"] = "Mulai overload"
    else:
        data["status_msg"] = "OVERLOAD CUYYY!"

    return data

if __name__ == '__main__':
    print(ambil_data_cpu())