from models import db, User,TokenBlocklist
from flask import request, jsonify, Blueprint
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt

auth_bp = Blueprint('auth_bp', __name__)


# login route
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    name = data['name']
    password = data['_password_hash']
    
    user = User.query.filter_by(name=name).first()

    if user and bcrypt.check_password_hash(user._password_hash, password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
        
    return jsonify({"error": "Wrong Password!"}), 401


# Get logged in user
@auth_bp.route("/authenticated_user", methods=["GET"])
@jwt_required()
def authenticated_user():
    current_user_id = get_jwt_identity() #geeting current user id
    user = User.query.get(current_user_id)

    if user:
        user_data = {
            'id': user.id,
            'username':user.name,
            'email': user.email
        }
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404


# Logout user
@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jwt = get_jwt()

    jti = jwt['jti']

    token_b = TokenBlocklist(jti=jti)
    db.session.add(token_b)
    db.session.commit()

    return jsonify({"success": "Logged out successfully!"}), 200