import React, { Component } from "react";
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
	tablehead: {
		fontSize: "20pt",
		borderBottom: "none",
		width: 350
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
		
	},
	modalInput: {
		width: 300
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
			userID: this.props.user._id,
			open: false,
			first_name: '',
			last_name: '',
			phone_number: '',
			email: '',
			updatingContact: false,
			currentContactID: '',
			currentContactFirstName: '',
			currentContactLastName: '',
			currentContactPhoneNumber: '',
			currentContactEmail: ''
		};
	}

	handleCreateContact = () => {
		const {handleCreate} = this.props;
		const newContact = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			phone_number: this.state.phone_number, 
			email: this.state.email
		};

		const payload = {
			"contacts": [newContact]
		}

		handleCreate(payload);

		this.setState({
			updatingContact: false,
			open: false,
			first_name: '',
			last_name: '',
			phone_number: '',
			email: ''
		})
	};

	updateName = e => {
		const name = e.target.value;
		this.setState({ name });
	};

	
	handleUpdateContact = () => {
		const {handleUpdate} = this.props;
		const contactID = this.state.currentContactID;
		const updatedContact = {
			first_name: this.state.currentContactFirstName,
			last_name: this.state.currentContactLastName,
			phone_number: this.state.currentContactPhoneNumber, 
			email: this.state.currentContactEmail
		};
		const payload = {
			"contacts": updatedContact
		}
		handleUpdate(payload,contactID);
		this.handleClose();
		this.setState({
			updatingContact: false
		})

	};

	handleChange = (event) => {

		const {target: {name, value}} = event;
		this.setState({
			[name]:value
		}, () => console.log(this.state));
	};

	handleOnInputChange = e => {
		const { handleSearch } = this.props;
		handleSearch(e.target.value);
	};

	handleModalOpen = () => {

		this.setState({
			open: true
		})
	}

	handleOpenEditModal = (currentContact) => {
		console.log(currentContact);
		this.setState({
			updatingContact: true,
			open: true,
			currentContactID: currentContact.contacts._id,
			currentContactFirstName: currentContact.contacts.first_name,
			currentContactLastName: currentContact.contacts.last_name,
			currentContactPhoneNumber: currentContact.contacts.phone_number,
			currentContactEmail: currentContact.contacts.email
		}, () => console.log(this.state));
	};

	handleClose = () => {
			this.setState({
				first_name: '',
				last_name: '',
				phone_number: '',
				email: '',
				open: false,
			}, 
			() => this.setState({
				updatingContact: false
			}));
	};

	contactList = () => {
		console.log(this.state.contacts);
		const { contacts, handleDelete, classes } = this.props;
		if (contacts.length > 0) {
			return contacts.map((currentContact, i) => {
				return (
					<TableRow key={i}>
						<TableCell className={classes.tablecell}>
							{" "}
							{currentContact.contacts.first_name}{" "}
						</TableCell>
						<TableCell className={classes.tablecell}>
							{" "}
							{currentContact.contacts.last_name}{" "}
						</TableCell>
						<TableCell className={classes.tablecell}>
							{" "}
							{currentContact.contacts.phone_number}{" "}
						</TableCell>
						<TableCell className={classes.tablecell}>
							{" "}
							{currentContact.contacts.email}{" "}
						</TableCell>
						<TableCell align="right">
							<IconButton 
								aria-label="edit"
								onClick={() => this.handleOpenEditModal(currentContact)}
							>							
								<EditIcon />
							</IconButton>
							<IconButton
								aria-label="delete"
								onClick={() => handleDelete(currentContact.contacts._id)}
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
		const { classes, handleCreate, contacts } = this.props;
		const { open } = this.state;

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
							onClick={this.handleModalOpen}
						>
							Create Contact
						</Button>
					</Grid>
				</Grid>
					<Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
						<DialogTitle id="form-dialog-title">New Contact</DialogTitle>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="first-name"
											label="First Name"
											name={this.state.updatingContact ? 'currentContactFirstName' : 'first_name'}
											defaultValue={this.state.updatingContact ? this.state.currentContactFirstName : ''}
											className={classes.modalInput}
											onChange={(event) => this.handleChange(event)}
										/>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="last-name"
											label="Last Name"
											name="last_name"
											name={this.state.updatingContact ? 'currentContactLastName' : 'last_name'}
											defaultValue={this.state.updatingContact ? this.state.currentContactLastName : ''}
											className={classes.modalInput}
											onChange={(event) => this.handleChange(event)}
										/>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="phone-number"
											label="Phone Number"
											name={this.state.updatingContact ? 'currentContactPhoneNumber' : 'phone_number'}
											defaultValue={this.state.updatingContact ? this.state.currentContactPhoneNumber : ''}
											className={classes.modalInput}
											onChange={(event) => this.handleChange(event)}
										/>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="email"
											label="Email Address"
											name="email"
											name={this.state.updatingContact ? 'currentContactEmail' : 'email'}
											autoComplete="email"
											defaultValue={this.state.updatingContact ? this.state.currentContactEmail : ''}
											className={classes.modalInput}
											onChange={(event) => this.handleChange(event)}
										/>
							<DialogActions>
								<Button onClick={this.handleClose} color="primary">
									Cancel
								</Button>
								{
									this.state.updatingContact ?
									<Button onClick={() => this.handleUpdateContact()} type="submit" color="primary">
										Save Contact
									</Button>
									: 
									<Button onClick={() => this.handleCreateContact()} type="submit" color="primary">
										Add New Contact
									</Button>									
								}
							</DialogActions>

					</Dialog>
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
								<TableCell></TableCell>
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
