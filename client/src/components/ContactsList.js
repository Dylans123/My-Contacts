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
import { makeStyles } from '@material-ui/core/styles';

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
			search:'',
			results: {},
			loading: false,
			message: '',
			name: "",
			userID: this.props.user._id
		};
	}

	updateName = e => {
		const name = e.target.value;
		this.setState({ name });
	};

	handleOnInputChange = ( event ) => {
		const { user } = this.props;
		const search = event.target.value;
		const userId = user._id;
		const payload = {
			"contacts":{
				first_name:"diffscrub",
				last_name:"xd",
				phone_number:"541-342",
				email:"plswark@outlook.com",
		}}; 

		console.log(search) // prints the value ( of the search)
		this.setState({ 
			search, 
			loading: true,
			message: '',
		})
		console.log(this.state) // logs everything in the state object 

		if(search != ""){
			api.searchContact(userId, search, payload).then(res => {
				this.setState({
					name: "",
					contactsarray: res.data
				});
			});
		}
	};

	getSearchResults = ( updatedPageNo, search ) => {
		const searchUrl = `INSERTAPIHERE`
	};

	contactList = () => {
		const { contacts } = this.props;
		return (
			contacts.map(function(currentContact, i) {
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
			})
		)
	};

	render() {
		const { classes, handleCreate, contacts } = this.props;
		const { search } = this.state;

		console.log(contacts)
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
							name = "search"
							value={search}
							onChange={ this.handleOnInputChange }
						/>
					</Grid>
					<Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
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
						<TableBody>{this.contactList()}</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ContactsList);
