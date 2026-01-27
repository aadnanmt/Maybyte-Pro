
from flask import Flask, render_template, jsonify
import monitor  

app = Flask(__name__)


@app.route('/')
def index():
    
    return render_template('index.html')


@app.route('/api/stats')
def stats():
    
    
    data = monitor.ambil_data_cpu() 
    
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)