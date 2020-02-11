import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ContactsList from "./ContactsList";
import AppBar from "./AppBar";
import { withStyles } from "@material-ui/core/styles";
import { Container, Snackbar, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
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

	handleCreate = async (payload) => {
		const { user } = this.state;
		const userId = user._id;
		await api.addContact(userId, payload).then(res => {
			this.handleOpenAlert("Contact has been created");
			this.getContacts();
		});
	};
	
	handleUpdate = async (payload, contactID) => {
		const {user} = this.state;
		const userId = user._id;
		console.log('userID: ' + userId);
		console.log('payload: ' + JSON.stringify(payload));
		console.log('contactID ' + contactID);
		await api.updateContact(userId, contactID, payload).then(res => {
			this.handleOpenAlert("Contact updated successfully");
			this.getContacts();
		});
	};

	handleDelete = async contactID => {
		const { user } = this.state;
		const userId = user._id;

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

		if (!(/\S/.test(searchQuery))) this.getContacts();
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
							<ContactsList user={user} contacts={contacts} handleSearch={this.handleSearch} handleCreate={this.handleCreate} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
						</Grid>
					</Container>
					<Snackbar
						open={openAlert}
						autoHideDuration={3000}
						onClose={this.handleCloseAlert}
						anchorOrigin={{ vertical: "top", horizontal: "center" }}
						message={alertMsg}
						action={
							<React.Fragment>
								<IconButton size="small" aria-label="close" color="inherit" onClick={this.handleCloseAlert}>
									<CloseIcon fontSize="small" />
								</IconButton>
							</React.Fragment>
						}
					>
					</Snackbar>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default withStyles(styles, { withTheme: true })(Contacts);
