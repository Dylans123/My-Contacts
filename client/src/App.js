import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Contacts from "./components/Contacts.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
			user: null,
			redirectTo: null
		};

		this._login = this._login.bind(this);
	}

	componentDidMount() {
		axios.get("/auth/user").then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				console.log("THERE IS A USER");
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	_login(username, password) {
		axios
			.post("/auth/login", {
				username,
				password
			})
			.then(response => {
				console.log(response);
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					});
					window.location.href = "/";
				}
			});
	}

	render() {
		const { user } = this.state;

		return (
			<div>
				<CssBaseline />
				<Route exact path="/" render={() => <Contacts user={user} />} />
				<Route
					exact
					path="/login"
					render={() => <Login _login={this._login} />}
				/>
				<Route exact path="/register" render={() => <Register />} />
			</div>
		);
	}
}

export default App;
