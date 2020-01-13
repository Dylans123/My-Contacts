import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'reactstrap';
import Create from './components/Create.js';
import ContactsList from './components/contactsList.js';
import NavigationBar from './components/NavigationBar.js';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Create />
        <ContactsList />
      </Container>
    </Router>
  );
}

export default App;
