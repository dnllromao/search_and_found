import React, { Component } from 'react';
import { Navbar, Nav, NavItem,FormGroup, FormControl, Button, Glyphicon, Grid, Row, Col, Image} from 'react-bootstrap';
//import logo from './logo.svg';
import './App.css';

const Header = () => (
  <Navbar fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Brand</a>
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
       <NavItem eventKey={2} href="#">
         <Button>
           <Glyphicon glyph="user" />
         </Button>
       </NavItem>
     </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const Thumb = ({trail}) => {
  console.log(trail);
  return(
  <Row className="show-grid thumb">
    <Col xs={12} md={4}>
      <Image src="/uploads/one.jpg" responsive rounded/>
    </Col>
    <Col xs={12} md={8}>
      <Row className="thumb-title">
        <Col xs={10} sm={11}>
          <h3><a href="">{trail.title}</a></h3>
        </Col>
        <Col xs={2} sm={1}>
          <Glyphicon glyph="heart" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="start-line">
            <Glyphicon glyph="star" />
            <Glyphicon glyph="star" />
            <Glyphicon glyph="star" />
            <Glyphicon glyph="star" />
            <Glyphicon glyph="star-empty" />
          </div>
        </Col>
      </Row>
      <Row className="thumb-content">
        <Col xs={12}>
          <p>{trail.description}</p>
          </Col>
      </Row>
      <Row className="thumb-features">
        <Col xs={4} className="thumb-features-item">
          <p><Glyphicon glyph="map-marker" />Brussels</p>
        </Col>
        <Col xs={4} className="thumb-features-item">
          <p><Glyphicon glyph="resize-horizontal" />60 km</p>
        </Col>
        <Col xs={4} className="thumb-features-item">
          <p><Glyphicon glyph="time" />60 km</p>
        </Col>
      </Row>
    </Col>
  </Row>
  );
};

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

class Main extends Component {

  constructor() {
    super();
    this.state = {
      trails: []
    }
  }

  componentDidMount() {

    // avec cette syntax this is undefined inside last then()
    /*fetch('http://localhost:5000/').then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      console.log(this);
    });*/ 

    fetch('http://localhost:3001/').then( response => {
      return response.json();
    }).then( data => {;
      //console.log(this);
      this.setState({ trails: data });
    });
  }

  render() {
    return (
      <main>
        <Grid>
          {this.state.trails.map( (trail, index) => {
            return (<Thumb trail={trail} key={index}/>);
          })}
        {/*  <Thumb />
          <Thumb />*/}
        </Grid>
      </main>
    );
  }
}

class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
