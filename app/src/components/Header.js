import React, { Component } from 'react';
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
  <Navbar fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Brand</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
     <Nav pullRight>
      <LinkContainer to="/search">
        <NavItem eventKey={1}>
          <FormGroup>
             <FormControl type="text" placeholder="Search" />
          </FormGroup>
          {/*<Button type="submit">Submit</Button>*/}
        </NavItem>
      </LinkContainer>
       <LinkContainer to="/user">
         <NavItem eventKey={2}>
             <Button>
               <Glyphicon glyph="user" />
             </Button>
         </NavItem>
       </LinkContainer>
     </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;