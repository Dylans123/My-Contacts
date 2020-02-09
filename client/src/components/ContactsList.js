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
		fontSize: "20pt",
		borderBottom: "none",
	},
	tablecell: {
		fontSize: "13pt"
	},
	gridContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 30
	},
	tableContainer: {
		height: 800,
		width: "100%",
		overflow: "auto",
		
	}
});

class ContactsList extends Component {
	constructor(props) {
		super(props);
		this.state = {

			search: "",
			results: {},
			loading: false,
			message: "",
			name: "",
			
		};
		
	}

	updateName = e => {
		const name = e.target.value;
		this.setState({ name });
	};

	

	onSubmitDelete = (value) => {
		const { handleDelete } = this.props;
		console.log("Delete ID: " + value);
		handleDelete(value)
	};

	handleOnInputChange = (e) => {
		//const { search } = this.props;
		//console.log(e);
		const search = e.target.value;
		//const { search } = this.props;
		console.log(search);
		const { user } = this.props;
		const userId = user._id;
		const { contacts } = this.props;
		console.log(contacts);
		
		const payload = {
			"contacts": {
				first_name: "",
				last_name: "",
				phone_number: "",
				email: ""
			}
		};

		console.log(search); // prints the value (of the search)
		this.setState({
			search,
			loading: true,
			message: ""
		});
		console.log(this.state); // logs everything in the state object

		if (search != "") {
			api.searchContact(userId, search, payload).then(res => {
				console.log(userId);
				console.log(search);
				console.log(res);
				console.log(res.data.success);
				console.log(res.data);
				this.setState({
					name: "",
					contacts: res.data,
				});
				console.log(this.state.contacts)
			});
		}
		else{
			//this.getContacts();
		}
	};	

	contactList = () => {
		console.log(this.state.contacts)
		console.log(this.state.search);
		if(this.state.search != "" && Array.isArray(this.state.contacts)){
		const { handleDelete, classes } = this.props;
		return this.state.contacts.map((currentContact, i) => {
			return (
				<TableRow key={i}>
					<TableCell className={classes.tablecell}> {currentContact.contacts.first_name} </TableCell>
					<TableCell className={classes.tablecell}> {currentContact.contacts.last_name} </TableCell>
					<TableCell className={classes.tablecell}> {currentContact.contacts.phone_number} </TableCell>
					<TableCell className={classes.tablecell}> {currentContact.contacts.email} </TableCell>
					<TableCell align="right">
						<IconButton aria-label="edit">
							<EditIcon />
						</IconButton>
						<IconButton
							aria-label="delete"
							onClick={() => handleDelete(currentContact.contacts._id)}
							// onClick={() => this.onSubmitDelete(currentContact.contacts._id)}
						>
							<DeleteIcon />
						</IconButton>
					</TableCell>
				</TableRow>
			);
			
		});
	}
	else if(this.state.search == ""){
		console.log(this.state.contacts)
		const { contacts, handleDelete, classes } = this.props;
		return contacts.map((currentContact, i) => {
			return (
				<TableRow key={i}>
					<TableCell className={classes.tablecell}> {currentContact.contacts.first_name} </TableCell>
					<TableCell className={classes.tablecell}> {currentContact.contacts.last_name} </TableCell>
					<TableCell className={classes.tablecell}> {currentContact.contacts.phone_number} </TableCell>
					<TableCell className={classes.tablecell}> {currentContact.contacts.email} </TableCell>
					<TableCell align="right">
						<IconButton aria-label="edit">
							<EditIcon />
						</IconButton>
						<IconButton
							aria-label="delete"
							onClick={() => handleDelete(currentContact.contacts._id)}
							// onClick={() => this.onSubmitDelete(currentContact.contacts._id)}
						>
							<DeleteIcon />
						</IconButton>
					</TableCell>
				</TableRow>
			);
			
		});

	}

	};

	
	render() {
		const { classes, handleCreate, contacts, } = this.props;
		const { search } = this.state;

		console.log(contacts);
		return (
			<div>
				<Grid container spacing={3} className={classes.gridContainer}>
					<Grid item xl={7} lg={7} md={7} sm={7} xs={7}>
						<TextField
							fullWidth
							id="outlined-search"
							label="Search field"
							type="search"
							variant="outlined"
							name="search"
							value={search}
							onChange={this.handleOnInputChange}
						/>
					</Grid>
					<Grid
						item
						xl={2}
						lg={2}
						md={2}
						sm={2}
						xs={2}
						style={{ marginRight: 50 }}
					>
						<Button
							variant="contained"
							size="large"
							color="primary"
							onClick={handleCreate}
						>
							Create Contact
						</Button>
					</Grid>
				</Grid>
				<TableContainer className={classes.tableContainer}>
					<Table aria-label="sticky table" stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell className={classes.tablehead}>First Name</TableCell>
								<TableCell className={classes.tablehead}>Last Name</TableCell>
								<TableCell className={classes.tablehead}>
									Phone Number
								</TableCell>
								<TableCell className={classes.tablehead}>Email</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>{this.contactList()}</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ContactsList);
