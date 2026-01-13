# initial package Maybyte
import psutil
import platform
import time
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# main route
@app.route('/')
def index():
    
    # information system
    sys_info = {
        'os': platform.system(),
        'node': platform.node(),
        'release': platform.release(),
        'machine': platform.machine(),
        'processor': platform.processor() or "Unknown"
    }
    
    # send variabel sys_info to HTML (./templates/index.html) with paramter info
    return render_template('index.html', info=sys_info)

if __name__ == '__main__':
    app.run(debug=True, port=5555)