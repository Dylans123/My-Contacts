import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap';
import Create from './components/Create.js';
import ContactsList from './components/contactsList.js';
import NavigationBar from './components/NavigationBar.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

function App() {
  return (
    <Router>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <PrivateRoute path="/contacts">
        <NavigationBar />
        <Container>
          <Create />
          <ContactsList />
        </Container>
      </PrivateRoute>
      <Route path="*">
        <Login />
      </Route> 
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        false ? (
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
  );
}

export default App;
