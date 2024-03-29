from flask import Flask, make_response, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from datetime import timedelta
from views import *


from models import db, User, Review, Property, TokenBlocklist


app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://realestate_c3nb_user:69VPkP6GkG4i9TCk1FeXMP3rY4fLttF7@dpg-cmq30heg1b2c73d3ekng-a.oregon-postgres.render.com/realestate_c3nb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

jwt = JWTManager()
app.config["JWT_SECRET_KEY"] = "#scvijk_ltrpjkia"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt.init_app(app)

@app.route("/")
def landing_page():
    return "<h1>WELCOME TO THE DATABASE</h1>"
    
app.register_blueprint(user_bp)
app.register_blueprint(review_bp)
app.register_blueprint(property_bp)
app.register_blueprint(auth_bp)

# JWT LOADER
@jwt.token_in_blocklist_loader
def token_in_blocklist_callback(jwt_header, jwt_data):
    jti = jwt_data['jti']
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    if token:
        return token 
    else:
        return None


if __name__ == '__main__':
    app.run(port=5555, debug=True)