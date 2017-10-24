import React, { Component } from 'react';
import { Grid, Row, ButtonToolbar, Button, Glyphicon, Col, FormGroup, ControlLabel, FormControl, Form, InputGroup, HelpBlock } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import UserNew from './UserNew';

const UserProfile = () => (
    <h1>user profile</h1>
);


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