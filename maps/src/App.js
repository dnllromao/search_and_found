import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    window.initMap = this.initMap.bind(this);

    const src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBfZtdsQ-AoMDg_4uHJf65dhoa8RMqO6B4&callback=initMap';
    const ref = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }

  initMap() {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsDisplay = new window.google.maps.DirectionsRenderer();
    let directionsRequest = {
      origin: 'Avenue Franklin Roosevelt 42, 1050 Bruxelles',
      destination: 'Gare Centrale, 1000 Bruxelles',
      travelMode: 'TRANSIT'
    };
    directionsService.route(directionsRequest, function(response, status){
      console.log(response);
      console.log(status);
      directionsDisplay.setDirections(response);
    });
    const map = new window.google.maps.Map(this.refs.map, {
                  center: {lat: 50.8296496, lng: 4.3507953},
                  zoom: 8
                });
    directionsDisplay.setMap(map);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div ref="map" style={{height: '500px'}}></div>
      </div>
    );
  }
}

export default App;
