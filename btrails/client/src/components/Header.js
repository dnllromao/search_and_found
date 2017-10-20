import React, { Component } from 'react';
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';

const Header = () => (
  <Navbar fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Brand</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
     <Nav pullRight>
       <NavItem eventKey={1} href="#">
         <FormGroup>
           <FormControl type="text" placeholder="Search" />
         </FormGroup>
         {' '}
         {/*<Button type="submit">Submit</Button>*/}
       </NavItem>
       <NavItem eventKey={2} href="/user">
         <Button>
           <Glyphicon glyph="user" />
         </Button>
       </NavItem>
     </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;