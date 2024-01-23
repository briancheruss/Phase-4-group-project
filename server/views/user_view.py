from models import db, User
from flask import request, jsonify, Blueprint
from flask_bcrypt import Bcrypt
from flask_jwt_extended import  jwt_required, get_jwt_identity

bcrypt = Bcrypt()
user_bp =Blueprint('user_bp', __name__)

# add user
@user_bp.route("/users", methods=["POST"])
def add_users():
    data = request.get_json()
    name = data['name']
    email = data['email']
    _password_hash = bcrypt.generate_password_hash(data['password'], )

 

    check_name = User.query.filter_by(name=name).first()
    check_email = User.query.filter_by(email=email).first()

    if check_name or check_email:
        return jsonify({"error": "User email/name already exist!"})

    else:
        new_user = User(email=email, _password_hash=_password_hash, name=name)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"success": "User added successfully!"}), 201
    
# fetch all users
@user_bp.route("/users")
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append({
            'id': user.id,
            'name': user.name,
            'email': user.email
        })
    return jsonify(user_list), 200

# fetch single user
@user_bp.route("/users/<int:user_id>")
def get_user(user_id):
    user = User.query.get(user_id)
    user_list = []
    
    if user:
        user_list.append({
            'id': user.id,
            'name': user.name,
            'email': user.email
        })
        return jsonify(user_list), 200

    else:
        return jsonify({"error":"User not found!"}), 404
    
# update user
@user_bp.route("/users", methods=["PUT"])
@jwt_required()
def update_user():
    user = User.query.get(get_jwt_identity())
    data = request.get_json()

    if user:
        name = data['name']
        email = data['email']

        # Check if the new values already exist for other users/ NOTE THIS
        check_name = User.query.filter(User.id != get_jwt_identity(), User.name == name).first()
        check_email = User.query.filter(User.id != get_jwt_identity(), User.email == email).first()


        if check_name or check_email:
            return jsonify({"error": "User-email and name already exist!"})
        else:
            user.name = name
            user.email = email
        
            db.session.commit()
            return jsonify({"success": "User updated successfully"}), 200
    else:
      return jsonify({"error":"User you are trying to update doesn't exist!"}), 404

#Deleting A User
@user_bp.route("/users", methods=["DELETE"])
@jwt_required()
def delete_user():
    user = User.query.get(get_jwt_identity())
    
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"success": "User deleted successfully"}), 200

    else:
        return jsonify({"error":"User does not exist!"}), 404