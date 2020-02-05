import React, { Component } from "react";
import api from "../api";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	tablehead: {
		fontSize: "18pt"
	},
	tablecell: {
		fontSize: "12pt"
	},
	gridContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 30
	}
});

class ContactsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			contactsArray: [],
			userID: this.props.user._id
		};
	}

	componentDidMount() {
		this.getContacts();
	}

	updateName = e => {
		const name = e.target.value;
		this.setState({ name });
	};

	handleCreate = async () => {
		const user_id = this.state.userID;

		const payload = {
			"contacts":{
				first_name:"TheFlash",
				last_name:"Barry",
				phone_number:"111-222-3344",
				email:"jl@gmail.com",
		}};
		console.log("User: ");
		console.log(user_id);
		console.log("This is the payload");
		console.log(payload);
		await api.addContact(user_id, payload).then(res => {
			window.alert(`Contact inserted successfully`);
		});
	};

	getContacts() {
		api
			.getContact(this.state.userID)
			.then(res => {
				this.setState({
					name: "",
					contactsArray: res.data
				});

				console.log(this.state.contactsArray);

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

	contactList = () => {
		return this.state.contactsArray.map(function(currentContact, i) {
			return (
				<TableRow>
					<TableCell> {currentContact.contacts.first_name} </TableCell>
					<TableCell> {currentContact.contacts.last_name} </TableCell>
					<TableCell> {currentContact.contacts.phone_number} </TableCell>
					<TableCell> {currentContact.contacts.email} </TableCell>
					<TableCell align="right">
						<IconButton aria-label="edit">
							<EditIcon />
						</IconButton>
						<IconButton aria-label="delete">
							<DeleteIcon />
						</IconButton>
					</TableCell>
				</TableRow>
			);
		});
	};

	render() {
		const { classes } = this.props;
		const { contactsArray } = this.state;

		console.log(contactsArray)

		return (
			<div>
				<Grid container spacing={3} className={classes.gridContainer}>
					<Grid item xl={7} lg={7} md={7} sm={7} xs={4}>
						<TextField
							fullWidth
							id="outlined-search"
							label="Search field"
							type="search"
							variant="outlined"
						/>
					</Grid>
					<Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
						<Button
							variant="contained"
							size="large"
							color="primary"
							onClick={this.handleCreate}
						>
							Create Contact
						</Button>
					</Grid>
				</Grid>
				<TableContainer>
					<Table aria-label="sticky table">
						<TableHead>
							<TableRow className={classes.table}>
								<TableCell className={classes.tablehead}>First Name</TableCell>
								<TableCell className={classes.tablehead}>Last Name</TableCell>
								<TableCell className={classes.tablehead}>
									Phone Number
								</TableCell>
								<TableCell className={classes.tablehead}>Email</TableCell>
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>{contactsArray.length != 0 ? this.contactList() : 'no contacts currently'}</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ContactsList);
