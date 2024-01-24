
from flask import Blueprint, jsonify, request
from models import Review, db
from sqlalchemy.orm import joinedload
from flask_jwt_extended import  jwt_required, get_jwt_identity

review_bp = Blueprint('review_bp', __name__)


# Create a review
@review_bp.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    data = request.json 

    new_review = Review(review_text=data['review_text'], rating=data['rating'], property_id=data['property_id'], user_id=get_jwt_identity())

    db.session.add(new_review)
    db.session.commit()

    return jsonify({'message': 'Review created successfully'}), 201



# Get all reviews for a specific property
@review_bp.route('/reviews/<int:review_id>', methods=['GET'])
def get_reviews_for_property(review_id):
    reviews = Review.query.filter_by(review_id=review_id).all()

    if not reviews:
        return jsonify({'message': 'No reviews found for the specified house'}), 404

    review_list = [{'id': review.id, 'review': review.review_text,'rating': review.rating, "property_id":review.property_id,'user_id': review.user_id} for review in reviews]

    return jsonify({'reviews': review_list})


# Update an review
@review_bp.route('/reviews/<int:review_id>', methods=['PUT'])
@jwt_required()
def update_review(review_id):
    review = Review.query.get(review_id)
    data = request.json

    if review:
        if review.user_id == get_jwt_identity():
            review.review_text = data['review_text']
            review.rating=data["review.rating"]
            db.session.commit()
            return jsonify({'message': 'Review updated successfully'})
        
        else:
            return jsonify({"error": "You are trying to delete the wrong review!"}), 404

    else:
        return jsonify({"error": "Review you are trying to delete can not be found!"}), 404



    

# Delete an review
@review_bp.route('/reviews/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    review = Review.query.get(review_id)

    if review:
        if review.user_id == get_jwt_identity():
            db.session.delete(review)
            db.session.commit()

            return jsonify({'message': 'Review deleted successfully'})
        else:
            return jsonify({"error": "You are trying to delete someone's review!"}), 404

    else:
        return jsonify({"error": "Review you are trying to delete is not found!"}), 404