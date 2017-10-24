import React, { Component } from 'react';
import { Grid, Row, ButtonToolbar, Button, Glyphicon, Col, FormGroup, ControlLabel, FormControl, Form, InputGroup, HelpBlock } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const FormBlock = (props) => {

  const ucFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const validation = () => {
    if(props.value === 'warning' || props.value === 'error') {
      return props.value;
    } else {
      return null
    }
  }

  const msg = () => {
    
    if(props.value === 'warning') {
      console.log('warning');
      return 'Don\'t forget to fill this field.';
    } else if(props.value === 'error') {
      console.log('error');
      return 'This is not a valid ' + props.field + '.';
    }

    return null;
  }


  return(
    <FormGroup controlId={props.field} validationState={validation()}>
      <Col componentClass={ControlLabel} sm={2}>
        {ucFirst(props.field)}
      </Col>
      <Col sm={10}>
        {props.children}
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

    let result;

    switch(name) {
      case 'title':
      case 'description':
      case 'city':

        const regex = /(<([^>]+)>)/ig;
        // regex origin: https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/

        if(value) {

          if(value.match(regex)) {
            result = 'error';
          } else {
            result = 'ok';
          }

        } else {
          result = 'warning';
        }

        break;

      case 'distance':

        value = +value;

        if(value && value > 0 ) {
            result = 'ok';
        } else {
            result = 'warning';
        }

        break;

        case 'duration':

        	//value = +value;
        	console.log('value');
        	console.dir(value);

        	if(value) {
        		console.log('oui value');
        		// pourquoi ???
        	}

        	if( value && value >= 0 ) {
        		console.log('value >= 0');
        		let opposite = (subname === 'hours')? this.state.data.duration.minutes: this.state.data.duration.hours;
  /*      		console.log('opposite');
        		console.log(opposite);
        		console.log((value + opposite) > 0);*/
        		if((value + opposite) > 0 ) {
        			result = 'ok';
        		} else {
        			result = 'warning';
        		}
        	} else {
        		console.log('value < 0');
        	    result = 'warning';
        	}
        break;
    }
    console.log('result-input-validation'); console.log(result);
    return result;

  }

  _handleSubmit(e) {
    e.preventDefault();

    //let that  = this;
/*    console.dir(this.state);
    console.log(this.state.control);;*/

    let allGood = () => {
    	const data = Object.assign({},this.state.data);
    	const control = Object.assign({},this.state.control);
    	let good = true;
    	//console.log(data);

    	for( let key in data ) {

    		let result;
    		if(typeof(data[key]) === 'object') {

    			for( let ind in data[key] ) {
    				/*console.log(ind);*/
    				//result = this.inputValidation(data[key][ind], key, ind );
    				result = this.inputValidation(data[key][ind], key, 'minutes' );
    				console.log('result');
    				console.log(result);
		    		/*if(result === 'ok') {
		    			result = null;
		    		}else {
		    			good = false;
		    		}
					control[key] = result;*/
    			}

    		} else {

    			result = this.inputValidation(data[key], key, null );

    		}

    		//console.log('result of ' + key + ' = ' + result);
    		if(result === 'ok') {
    			result = null;
    		}else {
    			good = false;
    		}
			control[key] = result;

    	}
    	/*console.log('control outside for');
    	console.log(control);*/
    	this.setState({ control: control }, function() {
    	  /*console.log(this.state.control);
    	  console.log(this.state.data);*/
    	});

    	return good;
    }

   
/*     console.log(allGood());
      console.log('allGood');
console.log(this.state.data);*/
     if(!allGood()) {
     	return;
     }
/*
     console.log('afterallGood');
     console.log(this.state.data);*/


/*    fetch('http://localhost:3000/api', {
        method: 'post',
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ name: 'coucou'})
      })
      .then(function(response) {
        console.log(response);
        if(response.ok) {
          return response.blob();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });*/
  }

  _handleInputChange(e) { 
    console.log('handle change');

    let fieldName = e.target.name.split('_');;
    let fieldValue = e.target.value;

    let name = fieldName[0];
    let subname = fieldName[1] || null;


    let result = this.inputValidation(fieldValue, name, subname );


    if(result === 'ok') {
    	let data = Object.assign({},this.state.data);
    	if(subname) {

    		data[name][subname] = fieldValue;
    	} else {

    		data[name] = fieldValue;
    	}
    	this.setState({ data: data }, function() {

    	});

    	result = null;
    }

	let control = Object.assign({},this.state.control);
	control[name] = result;

	this.setState({ control: control }, function() {
	  /*console.log(this.state.control);
	  console.log(this.state.data);*/
	}); 

    
  }

  render() {
    return(
      <div className="inner-main">
        <h1>Create your own trail</h1>
        <Form horizontal onSubmit={this._handleSubmit.bind(this)}>

          <FormBlock field="title" 
                     value={this.state.control.title}>
            <FormControl type="text"
                         name="title"
                         inputRef={ ref => this._title = ref } 
                         onBlur={this._handleInputChange.bind(this)}>
            </FormControl>
          </FormBlock>

          <FormBlock field="description"
                     value={this.state.control.description}>
            <FormControl componentClass="textarea"
                         name="description" 
                         inputRef={ ref => this._description = ref } 
                         onBlur={this._handleInputChange.bind(this)}>
            </FormControl>
          </FormBlock>

          <FormBlock field="city"
                     value={this.state.control.city}>
            <FormControl componentClass="select"
                         name="city"
                         inputRef={ ref => this._city = ref } 
                         onBlur={this._handleInputChange.bind(this)}>
              <option value="other">...</option>
              <option value="brussels">Brussels</option>
            </FormControl>
          </FormBlock>

          <FormBlock field="distance"
                     value={this.state.control.distance}>
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
                     value={this.state.control.duration}>
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