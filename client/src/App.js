import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Contacts from './components/Contacts.js';
import axios from 'axios'

class App extends Component {
  constructor() {
		super()
		this.state = {
			loggedIn: false,
      user: null,
      redirectTo: null,
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
  }
  
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
          user: response.data.user,
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
  }
  
  _logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
        })
        window.location.href = '/login';
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
          })
          window.location.href = '/';
        }
			})
	}

  render() {
    const { user } = this.state;

    return (
        <div>
          <NavigationBar _logout={this._logout} />
          <Route exact path="/" render={() => <Contacts user={user} />} />
          <Route exact path="/login" render={() => <Login _login={this._login} />} />
          <Route exact path="/register" render={() => <Register />} />
        </div>
      );
  }
}

export default App;
