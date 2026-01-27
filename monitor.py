import psutil

def ambil_data_cpu():
	persentase_cpu = psutil.cpu_percent(interval=1)
	cpu_core = psutil.cpu_count(logical=False)
	cpu_threads = psutil.cpu_count(logical=True)

	mentahan_data = {
		'cpu': persentase_cpu,
		'status': 'Masih aman cuy' if persentase_cpu < 85 else 'cpu Throttling cuy',
		'core': cpu_core,
		'cpu_threads': cpu_threads
	}

	return mentahan_data

if __name__ == '__main__':
	print('Sdnag memantau cpu')
	print("\n")
	
	hasil_data_mentahan = ambil_data_cpu()
	print('laporan dari psutil soal persentase cpu', hasil_data_mentahan)
	print("\n")
	print("laporan dari psutil soal core dan threads", hasil_data_mentahan)