from flask import Flask, render_template, jsonify
from flask_minify import Minify
from backend.monitor import ambil_data_cpu
from backend.security import validate_request

app = Flask(__name__)
Minify(app=app, html=True, js=True, cssless=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/stats')
@validate_request
def stats():
    data = ambil_data_cpu() 
    return jsonify(data)

# recommended from m to production
if __name__ == '__main__':
    app.run()

# enable to development mode
# if __name__ == '__main__':
#     app.run(debug=True, port=5000) 