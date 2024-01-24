import React from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top ">
        <Col md={4} className="d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <svg className="bi" width="30" height="24"></svg>
          </a>
          <span className="mb-3 mb-md-0 text-muted">© 2024 Boma Homes, Inc.</span>
        </Col>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-5"><a className="text-muted" href="https://github.com/briancheruss/Phase-4-group-project"><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li className="ms-3"><a className="text-muted" href="https://github.com/briancheruss/Phase-4-group-project"><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li className="ms-3"><a className="text-muted" href="https://github.com/briancheruss/Phase-4-group-project"><FontAwesomeIcon icon={faInstagram} /></a></li>
          <li className="ms-3"><a className="text-muted" href="https://github.com/briancheruss/Phase-4-group-project"><FontAwesomeIcon icon={faGithub} /></a></li>
        </ul>
      </footer>
    </div>
  );
}
