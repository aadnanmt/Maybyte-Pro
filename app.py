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

# recommended from m to production
if __name__ == '__main__':
    app.run

# enable to development
# if __name__ == '__main__':
#     app.run(debug=True, port=5000) 