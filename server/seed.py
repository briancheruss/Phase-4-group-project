import random
from faker import Faker
from app import app
from flask_bcrypt import Bcrypt
from models import db, User, Review, Property
bcrypt = Bcrypt()

fake = Faker()

image_urls = [
    "https://wallpapers.com/images/high/new-houses-pictures-0y9oswsxp4d257pe.webp",
    "https://wallpapers.com/images/high/new-houses-pictures-2mr7zviuswba7zmv.webp",
    "https://wallpapers.com/images/high/new-houses-pictures-33kapgl0478g099j.webp",
    "https://wallpapers.com/images/high/beautiful-house-pictures-gi9u23e95gi8iu2e.webp",
    "https://wallpapers.com/images/high/beautiful-house-pictures-fhoh190w7euad6o6.webp",
    "https://wallpapers.com/images/high/beautiful-house-pictures-1c5f7vu1jg14ogp2.webp",
    "https://wallpapers.com/images/high/beautiful-house-pictures-06pplwglqh6huv5u.webp",
    "https://wallpapers.com/images/high/beautiful-house-pictures-ndom9gqsw1u53yjp.webp",
    "https://wallpapers.com/images/high/beautiful-house-pictures-4q8feonsixnjz8u8.webp",
    "https://wallpapers.com/images/high/cabin-pictures-xjr0x3v78iuo5tg2.webp",
    "https://wallpapers.com/images/high/house-pictures-ntfqwdgxy2vzyiy9.webp",
    "https://wallpapers.com/images/high/house-pictures-t7uxethi7pkjagj3.webp",
    "https://wallpapers.com/images/high/chinese-house-with-pond-9nedo5cjnts9oq6y.webp",
    "https://wallpapers.com/images/high/farmhouse-pictures-gyqwg2xol1q6e1sm.webp",
    "https://wallpapers.com/images/high/farmhouse-pictures-l4jinlfxul5uzlid.webp"
]


addresses = [
    "123 Main Street, Cityville, State 12345",
    "456 Elm Avenue, Townburg, State 67890",
    "789 Oak Lane, Villagetown, State 13579",
    "101 Pine Road, Hamletville, State 24680",
    "202 Cedar Street, Suburbia, State 98765",
    "303 Maple Drive, Countryside, State 43210",
    "404 Birch Court, Meadowville, State 56789",
    "505 Redwood Avenue, Hilltop, State 12345",
    "606 Spruce Lane, Lakeside, State 67890",
    "707 Willow Road, Riverside, State 13579",
    "808 Sycamore Street, Mountainview, State 24680",
    "909 Juniper Lane, Beachtown, State 98765",
    "210 Cedar Street, Skyline, State 43210",
    "321 Birch Court, Highlands, State 56789",
    "432 Elm Avenue, Valleyview, State 12345",
    "543 Pine Road, Harbor, State 67890",
    "654 Oak Lane, Lakeshore, State 13579",
    "765 Maple Drive, Hillside, State 24680",
    "876 Redwood Avenue, Summit, State 98765",
    "987 Spruce Lane, Bayview, State 43210"
]
residential_building_names = [
    "Sunset Residences",
    "Green Meadows Apartments",
    "Harbor View Homes",
    "Pinecrest Estates",
    "Golden Gate Apartments",
    "Riverside Villas",
    "Mountain View Towers",
    "Maple Grove Residences",
    "Lakeside Heights Apartments",
    "Countryside Manor",
    "Hillcrest Apartments",
    "Ocean Breeze Condos",
    "Valley View Homes",
    "Highland Park Residences",
    "Meadowside Apartments",
    "City Lights Towers",
    "Sycamore Gardens",
    "Redwood Ridge Condos",
    "Willow Springs Homes",
    "Evergreen Apartments",
    "Prairie Creek Villas",
    "Oakwood Terrace",
    "Blue Sky Residences",
    "Hilltop Haven Apartments",
    "Seaview Condominiums",
    "Woodland Heights Homes",
    "Village Green Apartments",
    "Birchwood Estates",
    "Ridgeview Residences"
]

house_advertisements = [
    "Elevate your living experience in a home where luxury meets lifestyle. Your perfect haven awaits.",
    "Unlock the door to extraordinary living with our meticulously designed residences.",
    "Escape to a sanctuary of sophistication and comfort. Discover the beauty of your dream home.",
    "Indulge in the art of elegant living. Our residences redefine opulence and tranquility.",
    "Step into a world of refined luxury where every corner tells a story of timeless elegance.",
    "Your dream home, where modernity and serenity coexist. Experience the extraordinary.",
    "Live beautifully in a residence that celebrates the perfect fusion of design and comfort.",
    "Welcome to a living masterpiece – a place where architecture and nature harmonize.",
    "Define your lifestyle in a home that reflects your discerning taste. Your sanctuary awaits.",
    "Embrace the allure of sophisticated living in our exclusive collection of homes.",
    "Discover the perfect balance of luxury and convenience. Your dream residence is here.",
    "Escape the ordinary and embrace the extraordinary in our thoughtfully designed homes.",
    "Your private retreat, where every detail is a promise of a life well-lived. Welcome home.",
    "Unwind in the lap of opulence surrounded by architectural marvels and serenity.",
    "Elegance meets comfort in our residences. Welcome to a world where every moment is beautiful.",
    "Experience the poetry of living in a residence that transcends expectations. Your dream begins here."
]
house_reviews = [
    "Absolutely thrilled with our new home! The attention to detail and modern design exceeded our expectations.",
    "Living here is a dream come true. The stunning views and thoughtful amenities make it a perfect retreat.",
    "Impressed by the quality of construction and the luxurious finishes. This home is a testament to fine craftsmanship.",
    "From the moment we stepped in, we knew it was the one. The spacious layout and elegant interiors make it truly special.",
    "A home that blends style and comfort seamlessly. The open floor plan and natural light create a warm and inviting atmosphere.",
    "The neighborhood is fantastic, and our home is a true gem. We feel lucky to have found such a perfect place to live.",
    "Exceptional living experience! The attention the developers paid to every detail is evident throughout the entire residence.",
    "Our home is not just a house; it's a sanctuary. The thoughtful design and high-end finishes make it a joy to live in.",
    "Couldn't be happier with our decision. The community is welcoming, and the home is designed with both elegance and functionality in mind.",
    "The design is impeccable, and the quality is outstanding. We are proud to call this beautifully crafted house our home.",
    "Living here feels like a constant vacation. The serene surroundings and well-designed spaces make it a perfect escape from the hustle and bustle.",
    "The attention to detail in both the interior and exterior spaces is remarkable. Every day feels like a staycation in this beautiful home.",
    "Our neighbors are fantastic, and the community events create a sense of belonging. It's not just a home; it's a community we're proud to be a part of.",
    "The architecture is stunning, and the layout is functional. We appreciate the thought put into making this home a haven for our family.",
    "Moving here was the best decision we made. The friendly atmosphere and well-maintained common areas contribute to an exceptional living experience.",
]


with app.app_context():
    # Clear existing data
    User.query.delete()
    Review.query.delete()
    Property.query.delete()

    # Seed users
    users = []
    for _ in range(50):
        user_details = User(
            name=fake.name(),
            email=fake.email(),
            _password_hash=bcrypt.generate_password_hash(fake.word()).decode('utf-8')
        )
        users.append(user_details)
        db.session.add(user_details)

    db.session.commit()

    # Seed properties
    properties = []
    for _ in range(50):
        property_details = Property(
            image=random.choice(image_urls),
            name=random.choice(residential_building_names),
            address=random.choice(addresses),
            price=random.randint(15000, 450000),
            description=random.choice(house_advertisements)
        )
        properties.append(property_details)
        db.session.add(property_details)

    db.session.commit()

    # Seed reviews
    for _ in range(50):
        user = random.choice(users)
        property = random.choice(properties)

        review = Review(
            rating="<AiFillStar className='ratings-star'/>",
            review_text=random.choice(house_reviews),
            user_id=user.id,
            property_id=property.id
        )
        db.session.add(review)

    db.session.commit()