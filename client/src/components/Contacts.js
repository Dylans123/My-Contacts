import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ContactsList from "./ContactsList";
import AppBar from "./AppBar";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
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
			contacts: [],
			openAlert: false,
			alertMsg: ""
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
				console.log(res.data.success);
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
			contacts: [
				{
					first_name: "sbarry",
					last_name: "allen",
					phone_number: "111-222-3344",
					email: "jl@gmail.com"
				}
			]
		};
		console.log("User: ");
		console.log(userId);
		console.log("This is the payload");
		console.log(payload);
		await api.addContact(userId, payload).then(res => {
			this.handleOpenAlert("Contact has been created");
			this.getContacts();
		});
	};

	handleDelete = async contactID => {
		const { user } = this.state;
		const userId = user._id;

		const payload = {
			contacts: {
				first_name: "",
				last_name: "",
				phone_number: "",
				email: ""
			}
		};

		console.log("/delete/" + userId + "/" + contactID);
		await api.deleteContact(userId, contactID).then(res => {
			console.log(res);
			this.getContacts();
			this.handleOpenAlert("Contact has been deleted");
		});
	};

	handleSearch = async searchQuery => {
		const { user } = this.state;
		const userId = user._id;

		if (searchQuery == "") this.getContacts();
		else {
			console.log("Searching: " + searchQuery);
			api.searchContact(userId, searchQuery).then(res => {
				console.log("Search results");
				console.log(res.data);
				this.setState({
					contacts: res.data
				});
			});
		}
	};

	handleCloseAlert = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		this.setState({
			openAlert: false
		});
	};

	handleOpenAlert = message => {
		this.setState({
			openAlert: true,
			alertMsg: message
		});
	};

	render() {
		const { user, contacts, openAlert, alertMsg } = this.state;
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
						></Grid>
						<Grid item className={classes.table}>
							<ContactsList
								user={user}
								contacts={contacts}
								handleCreate={() => this.handleCreate()}
								handleDelete={this.handleDelete}
								handleSearch={this.handleSearch}
							/>
						</Grid>
					</Container>
					<Snackbar
						open={openAlert}
						autoHideDuration={3000}
						onClose={this.handleCloseAlert}
						anchorOrigin={{ vertical: "top", horizontal: "center" }}
					>
						<Alert severity="success" onClose={this.handleCloseAlert}>
							{alertMsg}
						</Alert>
					</Snackbar>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default withStyles(styles, { withTheme: true })(Contacts);
