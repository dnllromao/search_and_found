import React, { Component } from 'react';
import { Grid, Row, Col, Image, Glyphicon } from 'react-bootstrap';

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

class Home extends Component {

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

    fetch('http://localhost:3001/api')
      .then( response => {
        return response.json();
      })
      .then( data => {
        this.setState({ trails: data });
      });

}

  render() {
    return (
      <main>
      <h1>Home</h1>

        <Grid>
          {this.state.trails.map( (trail, index) => {
            return (<Thumb trail={trail} key={index}/>);
          })}
        </Grid>
      </main>
    );
  }
}


export default Home;