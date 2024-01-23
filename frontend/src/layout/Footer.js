import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <Navbar bg="light" variant="light" className="py-3">
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col md={4} className="text-muted">
            <p>© 2024 Boma Homes, Inc</p>
          </Col>

          <Col md={4}>
            <Nav className="justify-content-end">
              <Nav.Item>
                <Nav.Link href="#" className="text-muted">Twitter</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" className="text-muted">Instagram</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" className="text-muted">Facebook</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Footer;
