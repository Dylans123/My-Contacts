import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ContactsList from "./ContactsList";
import AppBar from "./AppBar";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import api from "../api";

const styles = theme => ({
	root: {
		height: "100vh"
	},
	paper: {
		marginTop: 20
	},
	table: {
		marginTop: 40
	}
});

class Contacts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loggedIn: false,
			contacts: []
		};
		this._logout = this._logout.bind(this);
	}

	_logout(event) {
		event.preventDefault();
		console.log("logging out");
		axios.post("/auth/logout").then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
				window.location.href = "/login";
			}
		});
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
				this.getContacts();
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
				window.location.href = "/login";
			}
		});
	}

	getContacts() {
		const { user } = this.state;
		const userId = user._id;
		api
			.getContact(userId)
			.then(res => {
				console.log(res);
				console.log(res.data.success)
				console.log(res.data.results);
				if (res.data.success) {
					this.setState({
						name: "",
						contacts: res.data.results
					});
				}
				if (!res.data.errmsg) {
					console.log("Data fetched");
				} else {
					console.log("Error fetching data");
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	handleCreate = async () => {
		const { user } = this.state;
		const userId = user._id;
		const payload = {
			"contacts":{
				first_name:"TheFlash",
				last_name:"Barry",
				phone_number:"111-222-3344",
				email:"jl@gmail.com",
		}};
		console.log("User: ");
		console.log(userId);
		console.log("This is the payload");
		console.log(payload);
		await api.addContact(userId, payload).then(res => {
			window.alert(`Contact inserted successfully`);
			this.getContacts();
		});
	};

	render() {
		const { user, contacts } = this.state;
		const { classes } = this.props;
		console.log(user === null);

		if (user) {
			return (
				<div className={classes.root}>
					<AppBar _logout={this._logout} />
					<Container maxWidth="xl">
						<Grid
							container
							className={classes.paper}
							direction="row"
							justify="center"
							alignItems="center"
							spacing={5}
						>
						</Grid>
						<Grid item className={classes.table}>
							<ContactsList user={this.state.user} contacts={contacts} handleCreate={() => this.handleCreate()} />
						</Grid>
					</Container>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default withStyles(styles, { withTheme: true })(Contacts);