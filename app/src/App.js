import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Search from './components/Search';
import User from './components/User/User';

//import logo from './logo.svg';
//import './App.css';



class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Header />
        <Switch>
         <Route exact path="/" component={Home}/>
          <Route path="/search" component={Search}/>
          <Route path="/user" component={User}/>}
        </Switch>
        <Footer />
      </div>
    );
  }

}

export default App;
