import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Create from './components/Create.js';
import ContactsList from './components/contactsList.js';
import NavigationBar from './components/NavigationBar.js';

function App() {
  return (
      <Router>
          <NavigationBar />
          <Create />
          <ContactsList />
    </Router>
  );
}

export default App;
