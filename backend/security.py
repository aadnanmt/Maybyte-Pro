from flask import request, jsonify
from functools import wraps

def validate_request(f):
    # validate request wraps 
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.headers.get('X-Requested-With') != 'XMLHttpRequest':
            return jsonify({'error': 'Invalid request'}), 403
        return f(*args, **kwargs)
    return decorated_function

def validate_request_headers(required_headers=None):
    # decorator untuk validasi custom headers
    if required_headers is None:
        required_headers = {}
    
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            for header, expected_value in required_headers.items():
                if request.headers.get(header) != expected_value:
                    return jsonify({'error': f'Missing or invalid header: {header}'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator
