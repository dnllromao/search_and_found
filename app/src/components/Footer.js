import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

const Footer = () => (
  <footer id="footer">
    <Grid>
      <Row>
        <Col xs={5}>
          <ul className="social-block">
            <li><a href="#"><Glyphicon glyph="envelope" /></a></li>
            <li><a href="#"><Glyphicon glyph="envelope" /></a></li>
            <li><a href="#"><Glyphicon glyph="envelope" /></a></li>
          </ul>
        </Col>
        <Col xs={7}>
          <p className="footer-quotes">Made with <span>&#10084;</span> for nature</p>
        </Col>
      </Row>
    </Grid>
  </footer>
);

export default Footer;