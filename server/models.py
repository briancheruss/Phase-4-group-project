from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', back_populates="user")

    @hybrid_property
    def password_hash(self):
        """Getter for the password hash."""
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        """Setter for the password hash."""
        self._password_hash = password

    def __init__(self, name, email, _password_hash):
        """Constructor for the User model."""
        self.name = name
        self.email = email
        self._password_hash = _password_hash  # Use the correct attribute here


    def authenticate(self, password):
        print("Stored password hash length:", len(self._password_hash))
        return bcrypt.check_password_hash(
            self._password_hash.encode('utf-8'), password.encode('utf-8'))



    def __repr__(self):
        """Representation of the User object."""
        return f'User {self.name}, ID {self.id}'


    
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', back_populates="property")

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    review_text = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)

    user = db.relationship('User', back_populates="reviews")
    property = db.relationship('Property', back_populates="reviews")
