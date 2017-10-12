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
    const map = new window.google.maps.Map(this.refs.map, {
                  center: {lat: -34.397, lng: 150.644},
                  zoom: 8
                });
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
