from flask import Blueprint, jsonify, request
from models import Property, db, Review
from sqlalchemy.orm import joinedload
from flask_jwt_extended import  jwt_required, get_jwt_identity

property_bp = Blueprint('property_bp', __name__)


# Fetch all properties
@property_bp.route('/property', methods=['GET'])
def get_all_properties():
    properties =  Property.query.all()
 
    result = []
    for property in properties:
        reviews = property.reviews

        result.append({
            'id': property.id,
            'image': property.image,
            'name': property.name,
            'address': property.address,
            'price': property.price,
            'description': property.description,
            'reviews': [{'id': review.id, 'body': review.review_text} for review in property.reviews]
        })
    return jsonify(result), 200

# Fetch a single House
@property_bp.route('/property/<int:property_id>', methods=['GET'])
def get_property(property_id):
    property = Property.query.get(property_id)
    result = []

    if property:
        result.append({
            'id': property.id,
            'image': property.image,
            'name': property.name,
            'address': property.address,
            'price': property.price,
            'description': property.description,
            'reviews': [{'id': review.id, 'body': review.review_text} for review in property.reviews]
        })
        return jsonify(result)
    else:
     return jsonify({"error": "House not found!"}), 404


# Create a New House
@property_bp.route('/property', methods=['POST'])
@jwt_required()
def create_house():
    data = request.get_json()
    print("DATA ", data)
    new_house = Property(image=data['image'], name=data['name'],address=data['address'],price=data['price'], description=data['description'])
    db.session.add(new_house)
    db.session.commit()
    return jsonify({"success": "New House created successfully!"}), 201


# Update a House
@property_bp.route('/property/<int:property_id>', methods=['PUT'])
@jwt_required()
def update_house(property_id):
    property = Property.query.get(property_id)
    if property:
            data = request.get_json()

            property.name = data.get('name', property.name)
            property.price = data.get('price', property.price)
            property.description=data.get('description', property.description)
            db.session.commit()
            return jsonify({"success": "Property details updated successfully"}), 200

    
    else:
         return jsonify({"error": "Unauthorized or House not found"}), 404

# Delete A House
@property_bp.route('/property/<int:property_id>', methods=['DELETE'])
@jwt_required()
def delete_property(property_id):
    property = Property.query.get(property_id)
    if property:
            db.session.delete(property)
            db.session.commit()
            return jsonify({"success": "Deleted successfully!"}), 200
    else:
        
        return jsonify({"error": "Unauthorized or House not found"}), 404


# Fetch all reviews related to a property
@property_bp.route('/property_reviews/<int:property_id>')
def get_property_reviews(property_id):
    property = Property.query.get_or_404(property_id)
    
    
    reviews = property.reviews

    # Preparing JSON response
    property_data = {
        'id': property.id,
        'image': property.image,
        'address': property.address,
        'price': property.price,
        'description': property.description,
        'reviews': [{'id': review.id, 'review_text': review.review_text} for review in reviews]
    }


    return jsonify(property_data)
