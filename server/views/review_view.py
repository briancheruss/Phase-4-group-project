
from flask import Blueprint, jsonify, request
from models import Review, db
from sqlalchemy.orm import joinedload
from flask_jwt_extended import  jwt_required, get_jwt_identity

review_bp = Blueprint('review_bp', __name__)


# Create a review
@review_bp.route('/reviews', methods=['POST'])
def create_review():
    try:
        data = request.json 
        print("Received review data:", data)

        new_review = Review(review_text=data['review_text'], rating=data.get('rating', 0), property_id=data['property_id'])

        db.session.add(new_review)
        db.session.commit()

        return jsonify({'message': 'Review created successfully'}), 201
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Failed to create review'}), 500




# Get all reviews for a specific property
@review_bp.route('/reviews/<int:property_id>', methods=['GET'])
def get_reviews_for_property(property_id):
    reviews = Review.query.filter_by(property_id=property_id).all()

    if not reviews:
        return jsonify({'message': 'No reviews found for the specified property'}), 404

    review_list = [{'id': review.id, 'review': review.review_text, 'rating': review.rating, "property_id": review.property_id, 'user_id': review.user_id} for review in reviews]

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
            review.rating = data["rating"]
            db.session.commit()
            return jsonify({'message': 'Review updated successfully'})
        
        else:
            return jsonify({"error": "You are trying to delete the wrong review!"}), 404

    else:
        return jsonify({"error": "Review you are trying to delete can not be found!"}), 404



    

# Delete an review
@review_bp.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    try:
        review = Review.query.get(review_id)
        print("Review to delete:", review_id)

        if review:
            db.session.delete(review)
            db.session.commit()

            return jsonify({'message': 'Review deleted successfully'})
        else:
            return jsonify({"error": "Review not found"}), 404
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Failed to delete review'}), 500