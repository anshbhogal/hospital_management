from flask import Blueprint, request, jsonify
from hospital.services.auth_service import AuthService

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role_name = data.get('role_name', 'Patient')

    user, error = AuthService.register_user(name, email, password, role_name)

    if error:
        return jsonify(error), 400
    
    return jsonify({
        'message': 'User registered successfully',
        'user_id': user.user_id,
        'email': user.email
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    access_token, refresh_token, error = AuthService.login_user(email, password)

    if error:
        return jsonify(error), 401
    
    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token
    }), 200
