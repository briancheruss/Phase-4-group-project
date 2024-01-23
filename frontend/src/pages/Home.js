// Home.js
import React,{ useEffect } from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos'; // Import aos library

function Home() {
  const carouselItemStyle = {
    height: '100vh', // Set the height of the carousel items
    overflow: 'hidden', // Hide overflow to prevent large images from overflowing
  };

  useEffect(() => {
    // Initialize aos when the component mounts
    AOS.init({
      duration: 1500, // Set the animation duration
      easing: 'ease-in-out', // Set the animation easing
    });
  }, []); 

  const textContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
  };

  return (
    <Container fluid data-aos="fade-up">
      <Row>
        <Col>
          <Carousel>
            <Carousel.Item style={carouselItemStyle}>
              {/* Background image for the first slide */}
              <img
                className="d-block w-100"
                src="https://secure.365villas.com/getimage/uploads/config/relaxinnhomes/property/gallery/49/20211026_182756jpeg.jpeg"
                alt="First slide"
              />
              <div style={textContainerStyle} data-aos="fade-up">
                <h1 data-aos="fade-up">Welcome to Boma Homes</h1>
                <p>Discover your dream home with us.</p>
                <div data-aos="fade-up" >
                  <Button variant="primary">Get Started</Button>{' '}
                  <Button variant="outline-light">Explore Now</Button>
                </div>

              </div>
            </Carousel.Item>
            {/* Add more Carousel.Items for additional slides with different images */}
            <Carousel.Item style={carouselItemStyle}>
              <img
                className="d-block w-100"
                src="https://secure.365villas.com/getimage/uploads/config/relaxinnhomes/property/gallery/71/20230114_110345jpg.jpg"
                alt="Second slide"
              />
              <div style={textContainerStyle}>
                <h1>Welcome to Boma Homes</h1>
                <p>Discover your dream home with us.</p>
                <div >
                  <Button variant="primary">Get Started</Button>{' '}
                  <Button variant="outline-light">Explore Now</Button>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item style={carouselItemStyle}>
              <img
                className="d-block w-100"
                src="https://secure.365villas.com/getimage/uploads/config/relaxinnhomes/property/gallery/82/20230626_123840_3281jpg.jpg"
                alt="Second slide"
              />
              <div style={textContainerStyle}>
                <h1>Welcome to Boma Homes</h1>
                <p>Discover your dream home with us.</p>
                <div >
                  <Button variant="primary">Get Started</Button>{' '}
                  <Button variant="outline-light">Explore Now</Button>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item style={carouselItemStyle}>
              <img
                className="d-block w-100"
                src="https://secure.365villas.com/getimage/uploads/config/relaxinnhomes/property/gallery/52/20220119_113448jpg.jpg"
                alt="Second slide"
              />
              <div style={textContainerStyle}>
                <h1>Welcome to Boma Homes</h1>
                <p>Discover your dream home with us.</p>
                <div >
                  <Button variant="primary">Get Started</Button>{' '}
                  <Button variant="outline-light">Explore Now</Button>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
