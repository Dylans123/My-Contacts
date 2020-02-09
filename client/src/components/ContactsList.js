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
		overflow: "auto"
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
			name: ""
		};
	}

	updateName = e => {
		const name = e.target.value;
		this.setState({ name });
	};

	handleOnInputChange = e => {
		const { handleSearch } = this.props;
		handleSearch(e.target.value);
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
							<IconButton aria-label="edit">
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
