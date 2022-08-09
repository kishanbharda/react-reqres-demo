import React, { useState } from 'react';
import { Switch, Route, BrowserRouter as Router, NavLink, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import Home from './containers/home';
import Users from './containers/users';
import UserDetail from './containers/user-detail';
import Products from './containers/products';
import Login from './containers/login';
import Register from './containers/register';
import NotFound from './containers/notfound';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

export const PublicLayout = (props) => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
);

export const PrivateLayout = () => {
  const history = useHistory();
  const [expanded, setExpandedStatus] = useState(false);

  const logoutUser = () => {
    localStorage.removeItem("USER_TOKEN");
    history.replace('/');
  }

  return (
    <div>
      <Navbar
        bg="light"
        expand="lg"
        expanded={expanded}
        onToggle={() => {
          setExpandedStatus(!expanded)
        }}
      >
        <Navbar.Brand href="#home">React-Practice</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} activeClassName="active" exact to="/" onClick={() => setExpandedStatus(false)}>Home</Nav.Link>
            <Nav.Link as={NavLink} activeClassName="active" to="/users" onClick={() => setExpandedStatus(false)}>Users</Nav.Link>
            <Nav.Link as={NavLink} activeClassName="active" to="/products" onClick={() => setExpandedStatus(false)}>Products</Nav.Link>
          </Nav>
          <Button variant="outline-success" className="my-2" onClick={logoutUser}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <PrivateRoute path="/">
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route path="/users/user-detail" component={UserDetail} />
          <Route exact path="/products" component={Products} />
        </PrivateRoute>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("USER_TOKEN") !== null ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={PublicLayout} />
        <Route path="/" component={PrivateLayout} />
      </Switch>
    </Router>
  );
}

export default App;
