# import psutil
import random
import platform

def get_size(bytes, suffix="B"):
	format_byte = 1024
	for unit in ["", "K", "M", "G", "T", "P"]:
		if bytes < format_byte:
			return f"{bytes:.2f}{unit}{suffix}"
		bytes /= format_byte

try:
    import psutil

    MODE_REAL = False # change False to try mode data dummy on development

except ImportError:

    MODE_REAL = False 

def ambil_data_cpu():
    data = {}

    if MODE_REAL:

    	# CPU
        cpu_percent = psutil.cpu_percent(interval=None)
        core = psutil.cpu_count(logical=False)
        threads = psutil.cpu_count(logical=True)
        # RAM
        ram = psutil.virtual_memory()
        # DISK
        disk = psutil.disk_usage('/')

        data = {
        	# CPU | MODE REAL
            "cpu": cpu_percent,
            "core": core,
            "cpu_threads": threads,

            # RAM | MODE REAL
            "ram_percent": ram.percent,
            "ram_used": get_size(ram.used),
            "ram_available": get_size(ram.available),
            "ram_total": get_size(ram.total),

          	# DISK MODE REAL
            "disk_percent": disk.percent,
            "disk_used": get_size(disk.used),
            "disk_availabe": get_size(disk.free),
            "disk_total": get_size(disk.total),

            # INFORMASI SAAT MODE REAL
            "status": "Running on Hardware",
            "mode": "DATA REAL INI CUYYY"
        }
    
    else:
        fake_cpu = random.randint(5, 95)
        fake_ram_percent = random.randint(20, 80)
        fake_disk_percent = random.randint(40, 90)

        fake_total_ram = 16 * (1024**3)
        fake_total_disk = 512 * (1024**3)

        fake_used_ram = fake_total_ram * (fake_ram_percent / 100)
        fake_free_ram = fake_total_ram - fake_used_ram

        fake_used_disk = fake_total_disk * (fake_disk_percent / 100)
        fake_free_disk = fake_total_disk - fake_used_disk

        # AMBIL DATA DUMMY
        data = {
            # CPU | MODE DUMMY
            "cpu": fake_cpu,
            "core": 6,
            "cpu_threads": 12,

            # RAM | MODE DUMMY
            "ram_percent": fake_ram_percent,
            "ram_used": get_size(fake_used_ram),
            "ram_available": get_size(fake_free_ram), 
            "ram_total": get_size(fake_total_ram),

            # DISK | MODE DUMMY
            "disk_percent": fake_disk_percent,
            "disk_used": get_size(fake_used_disk),
            "disk_available": get_size(fake_free_disk),
            "disk_total": get_size(fake_total_disk),

            # STATUS
            "status": "Running on Data Dummy",
            "mode": "MODE DATA FAKE {DUMMY}"
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