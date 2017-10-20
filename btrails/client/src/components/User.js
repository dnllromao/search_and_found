import React, { Component } from 'react';
import { Grid, Row, ButtonToolbar, Button, Glyphicon, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

const UserProfile = () => (
    <h1>user profile</h1>
);

const UserNew = () => (
    <h1>user create</h1>
);

const User = ({match}) => {
  console.log(match);
  return(
    <main>
      <Grid>
        <Route path={`${match.url}/profile`} component={UserProfile}/>
        <Route path={`${match.url}/new`} component={UserNew}/>
        <Route exact path={match.url} render={() => (
          <div>
            <Row className="user-actions top">
              <Col xs={12}>
                <ButtonToolbar>
                  <Button bsStyle="primary" bsSize="small" href={`${match.url}/profile`}>
                    edit Profile
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>

            <h1>user dash</h1>

            <Row className="user-actions bottom">
              <Grid>
                <Col xs={12}>
                  <ButtonToolbar>
                    <Button bsStyle="primary" bsSize="large" href={`${match.url}/new`}>
                      <Glyphicon glyph="pencil" />
                    </Button>
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