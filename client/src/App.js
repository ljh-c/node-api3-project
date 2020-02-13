import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './App.css';

import Posts from './components/Posts';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Container className="main">
        <Row>
          <Col lg="3" md="4">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </div>
          </Col>
          <Router>
          <Col lg="9" md="8">
            <Router>
              <Switch>
                <Route path="/user/:id" component={Profile} />
                <Route path="/" component={Posts} />
              </Switch>
            </Router>
          </Col>
          </Router>
        </Row>
      </Container>
    </div>
  );
}

export default App;
