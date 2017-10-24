import React, { Component } from 'react';
import { Grid, Row, ButtonToolbar, Button, Glyphicon, Col, FormGroup, ControlLabel, FormControl, Form, InputGroup, HelpBlock } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const FormBlock = ({field, control, children}) => {

  const ucFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const msg = () => {
    
    if(control === 'warning') {
      return 'Don\'t forget to fill this field.';
    } else if(control === 'error') {
      return 'This is not a valid ' + field + '.';
    }

    return null;
  }


  return(
    <FormGroup controlId={field} validationState={control}>
      <Col componentClass={ControlLabel} sm={2}>
        {ucFirst(field)}
      </Col>
      <Col sm={10}>
        {children}
        <FormControl.Feedback />
        <HelpBlock>{ msg() }</HelpBlock>
      </Col>
    </FormGroup>
  );
}

class UserNew extends Component {

  constructor() {
    super();
    this.state = {
      data: {
        title: '',
        description: '',
        city: '',
        distance: 0,
        duration: {
        	hours: 0,
        	minutes: 0
        }
      },
      control: {
      	title: null,
      	description: null,
      	city: null,
      	distance: null,
      	duration: null
      }
    }
  }



  inputValidation(value, name, subname) {

    let error;

    switch(name) {
      case 'title':
      case 'description':
      case 'city':

        const regex = /(<([^>]+)>)/ig;
        // regex origin: https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
        
        error = (value)? ((value.match(regex))? 'error': null) : 'warning';

      break;
      case 'distance':

        value = +value;
        error = (value && value > 0)? null: 'warning';

      break;
      case 'duration':

        value = +value;

      	if( value != 'undefined' && value >= 0 ) {
      		let opposite = (subname === 'hours')? this.state.data.duration.minutes: this.state.data.duration.hours;
          error = ((value + opposite) > 0 )? null: 'warning';

      	} else {
      	  error = 'warning';
      	}

      break;
    }

    return error;

  }

  _handleSubmit(e) {
    e.preventDefault();

  	const data = Object.assign({},this.state.data);
  	const control = Object.assign({},this.state.control);
  	let submit = true;

    // validation of state.data 
  	for( let name in data ) {

  		let error;

  		if(typeof(data[name]) === 'object') {

  			for( let subname in data[name] ) {

  			 error = this.inputValidation(data[name][subname], name, subname );

  			}

  		} else {

  			error = this.inputValidation(data[name], name, null );

  		}

      submit  = (error != null)? false: submit;
		  control[name] = error;
  	}

    // update state.control
  	this.setState({ control: control });

    if(submit) {
      console.log('there is no errors');
      console.log(this.state.data);

      fetch('http://localhost:3000/api', {
        method: 'post',
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(this.state.data)
      })
      .then(function(response) {
        console.log('response from the server');
        console.log(response);
        // try to iunderstand this bolb type, and what kind of data passing and receiving (http communications)
        //return response.blob();
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      }).catch(function(error) {
        console.log('error from the server');
        console.log(error);
        if(err) throw err;
      });
    }

  }

  _handleInputChange(e) { 

    let fieldName = e.target.name.split('_');;
    let fieldValue = e.target.value;

    let name = fieldName[0];
    let subname = fieldName[1] || null;

    // validation of input value 
    let error = this.inputValidation(fieldValue, name, subname );

    // update of state.data
    if(error === null) {

    	let data = Object.assign({},this.state.data);

    	if(subname) { data[name][subname] = fieldValue; } 
      else { data[name] = fieldValue; }

    	this.setState({ data: data });

    }

    // validation of state.control
  	let control = Object.assign({},this.state.control);
  	control[name] = error;

  	this.setState({ control: control }); 

    
  }

  render() {
    return(
      <div className="inner-main">
        <h1>Create your own trail</h1>
        <Form horizontal onSubmit={this._handleSubmit.bind(this)}>

          <FormBlock field="title" 
                     control={this.state.control.title}>
            <FormControl type="text"
                         name="title"
                         inputRef={ ref => this._title = ref } 
                         onBlur={this._handleInputChange.bind(this)}>
            </FormControl>
          </FormBlock>

          <FormBlock field="description"
                     control={this.state.control.description}>
            <FormControl componentClass="textarea"
                         name="description" 
                         inputRef={ ref => this._description = ref } 
                         onBlur={this._handleInputChange.bind(this)}>
            </FormControl>
          </FormBlock>

          <FormBlock field="city"
                     control={this.state.control.city}>
            <FormControl componentClass="select"
                         name="city"
                         inputRef={ ref => this._city = ref } 
                         onBlur={this._handleInputChange.bind(this)}>
              <option value="other">...</option>
              <option value="brussels">Brussels</option>
            </FormControl>
          </FormBlock>

          <FormBlock field="distance"
                     control={this.state.control.distance}>
            <InputGroup>
              <input type="number" step="0" min="0" 
                     id="distance" name="distance" className="form-control" 
                     defaultValue={this.state.data.duration.minutes}
                     ref={ ref => this._distance = ref } 
                     onBlur={this._handleInputChange.bind(this)}/>
              <InputGroup.Addon>km</InputGroup.Addon>
            </InputGroup>
          </FormBlock>          

          <FormBlock field="duration"
                     control={this.state.control.duration}>
            <Row>
              <Col xs={5}>
                <InputGroup>
                  <input type="number" step="1" min="0" 
                         id="duration-hours" name="duration_hours" className="form-control" 
                         defaultValue={this.state.data.duration.minutes}
                         ref={ ref => this._duration_hours = ref }
                         onBlur={this._handleInputChange.bind(this)} />
                  <InputGroup.Addon>h</InputGroup.Addon>
                </InputGroup> 
              </Col>
              <Col xs={5}>
                <InputGroup>
                  <input type="number" step="1" min="0" max="59" 
                         id="duration-minutes" name="duration_minutes" className="form-control" 
                         defaultValue={this.state.data.duration.minutes}
                         ref={ ref => this._duration_minutes = ref }
                         onBlur={this._handleInputChange.bind(this)} />
                  <InputGroup.Addon>m</InputGroup.Addon>
                </InputGroup> 
              </Col>
            </Row>
          </FormBlock>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsStyle="primary">Save</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default UserNew;