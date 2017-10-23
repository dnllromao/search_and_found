import React, { Component } from 'react';
import { Grid, Row, ButtonToolbar, Button, Glyphicon, Col, FormGroup, ControlLabel, FormControl, Form, InputGroup, HelpBlock } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


const UserProfile = () => (
    <h1>user profile</h1>
);

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

  // if props.value duration ??


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
        duration: {}
      }
    }
  }

  inputValidation(type, inputName, value) {
    let data = Object.assign({},this.state.data);

    let inputSplit = inputName.split('_');
    let name = inputSplit[0];
    let subname = inputSplit[1];
    let error = true;

    console.log(value);
    switch(type) {
      case 'text':
      case 'textarea':
      case 'select-one':

        const regex = /(<([^>]+)>)/ig;
        // regex origin: https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/

        if(value) {


          if(value.match(regex)) {

            data[name] = 'error';
            this.setState({ data: data }, function() {
              //console.log(this.state);
              
            });

          } else {
            data[name] = value;
            this.setState({ data: data }, function() {
              //console.log(this.state);
              error = false;
            });
          }

        } else {

          data[name] = 'warning';
        
          this.setState({ data: data }, function() {
            console.log(this.state);
            
          });
        }
        break;

      case 'number':

        value = +value;

        if(value && value >= 0 ) {

          if(name) {
            data[name][subname] = value;
          }else {
            data[name] = value;
          }
          
          this.setState({ data: data }, function() {
            console.log(this.state);
            error = false;
          });
        } else {

          if(subname) {
            data[name][subname] = 0;
          }else {
            data[name] = 'warning';
          }

          this.setState({ data: data }, function() {
            console.log(this.state);
          });
        }
        break;
    }

    return new Promise(function(resolve, reject) {
      if(!error) {
        resolve('all good');
        
      } 
        reject('this field is missing');
    });
  }

  _handleSubmit(e) {
    e.preventDefault();

    let that  = this;
    let error = false;
    console.dir(this.state);

    this.inputValidation('text', 'title', this.state.data.title)
    .then(function(value) {
      console.log(value);
      return that.inputValidation('textarea', 'description', that.state.data.descrition);
    })
    .then(function(value) {
      console.log('value')
      console.log(value);
      return that.inputValidation('select-one', 'city', that.state.data.city);
    })
    .then(function(value) {
      console.log(value);
      return that.inputValidation('number', 'distance', that.state.data.distance);
    })
    .then(function(value) {
      console.log(value);
      return that.inputValidation('number', 'duration_hours', that.state.data.duration.hours);
    })
    .then(function(value) {
      console.log(value);
      return that.inputValidation('number', 'duration_minutes', that.state.data.duration.minutes);
    })
    .catch(function(error) {
      console.log(error);
      error = true;
      return 'errorsd';
    }).then(function(value) {
      console.log(value);
    });

    console.dir(this.state);
    if (error) {
      console.log('true_hey');
    } else {
      console.log('true_hey');
    }

   /* fetch('http://localhost:3000/api', {
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

    let fieldType = e.target.type;
    let fieldName = e.target.name;
    let fieldValue = e.target.value;

    this.inputValidation(fieldType, fieldName, fieldValue);   
  }

  render() {
    return(
      <div className="inner-main">
        <h1>Create your own trail</h1>
        <Form horizontal onSubmit={this._handleSubmit.bind(this)}>

          <FormBlock field="title" 
                     value={this.state.data.title}>
            <FormControl type="text"
                         name="title"
                         inputRef={ ref => this._title = ref } 
                         onBlur={this._handleInputChange.bind(this)}>
            </FormControl>
          </FormBlock>

          <FormBlock field="description"
                     value={this.state.data.description}>
            <FormControl componentClass="textarea"
                         name="description" 
                         inputRef={ ref => this._description = ref } 
                         onBlur={this._handleInputChange.bind(this)}>
            </FormControl>
          </FormBlock>

          <FormBlock field="city"
                     value={this.state.data.city}>
            <FormControl componentClass="select"
                         name="city"
                         inputRef={ ref => this._city = ref } 
                         onBlur={this._handleInputChange.bind(this)}>
              <option value="other">...</option>
              <option value="brussels">Brussels</option>
            </FormControl>
          </FormBlock>

          <FormBlock field="distance"
                     value={this.state.data.distance}>
            <InputGroup>
              <input type="number" step="0.1" min="0.1" 
                     id="distance" name="distance" className="form-control" 
                     ref={ ref => this._distance = ref } 
                     onBlur={this._handleInputChange.bind(this)}/>
              <InputGroup.Addon>km</InputGroup.Addon>
            </InputGroup>
          </FormBlock>          

          <FormBlock field="duration"
                     value={ ((this.state.data.duration.hours + this.state.data.duration.minutes) === 0)? 'warning': null }>
            <Row>
              <Col xs={5}>
                <InputGroup>
                  <input type="number" step="1" min="0" 
                         id="duration-hours" name="duration_hours" className="form-control" 
                         ref={ ref => this._duration_hours = ref }
                         onBlur={this._handleInputChange.bind(this)} />
                  <InputGroup.Addon>h</InputGroup.Addon>
                </InputGroup> 
              </Col>
              <Col xs={5}>
                <InputGroup>
                  <input type="number" step="1" min="0" max="59" 
                         id="duration-minutes" name="duration_minutes" className="form-control" 
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


const Toolbar = ({url, parent}) => {
  return(
    <Row className="user-actions top">
      <Col xs={12}>
        <ButtonToolbar>
          <LinkContainer to={ parent? `${url}/profile`: url }>
            <Button bsStyle="primary" bsSize="small"
                    className={ (!parent)? 'btn-left': '' }>
              { (parent? 'edit Profile': 'go Back') }
            </Button>
          </LinkContainer>
        </ButtonToolbar>
      </Col>
    </Row>
  );
};

const User = (props) => {
  console.log(props.match);
  return(
    <main>
      <Grid>
        <Toolbar url={props.match.url} parent={props.match.isExact} />
        <Route path={`${props.match.url}/profile`} component={UserProfile}/>
        <Route path={`${props.match.url}/new`} component={UserNew}/>
        <Route exact path={props.match.url} render={() => (
          <div className="inner-main">
            

            <h1>user dash</h1>

            <Row className="user-actions bottom">
              <Grid>
                <Col xs={12}>
                  <ButtonToolbar>
                    <LinkContainer to={`${props.match.url}/new`}>
                      <Button bsStyle="primary" bsSize="large">
                        <Glyphicon glyph="pencil" />
                      </Button>
                    </LinkContainer>
                  </ButtonToolbar>
                </Col>
              </Grid>
            </Row>
          </div>
        )}/>
      </Grid>
    </main>
  );
};

export default User;