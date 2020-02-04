import React, { Component } from "react";
import api from "../api";
import { MdEdit } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

export default class ContactsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			contactsarray: []
		};
	}

	componentDidMount() {
		this.getContacts();
	}

	getContacts = () => {
		api
			.getContact()
			.then(res => {
				this.setState({
					name: "",
					contactsarray: res.data
				});

				console.log(this.state.contactsarray);

				if (!res.data.errmsg) {
					console.log("Data fetched");
				} else {
					console.log("Error fetching data");
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	contactList() {
		return this.state.contactsarray.map(function(currentContact, i) {
			return (
				<TableRow>
					<TableCell> {currentContact.name} </TableCell>
					<TableCell> Lastnamefiller </TableCell>
					<TableCell> 111-1111 </TableCell>
					<TableCell> email@gmail.com </TableCell>
					<TableCell align="right">
						<Button type="button" className="close" aria-label="Close">
							<span aria-hidden="true">
								<FaTimes />
							</span>
						</Button>
						<Button type="button" className="close" aria-label="Close">
							<span aria-hidden="true">
								<MdEdit />
							</span>
						</Button>
					</TableCell>
				</TableRow>
			);
		});
	}
	//<TableBody>{this.contactList()}</TableBody>
	render() {
		return (
				<TableContainer fullWidth>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>First Name</TableCell>
								<TableCell>Last Name</TableCell>
								<TableCell>Phone Number</TableCell>
								<TableCell>Email</TableCell>
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell> Mc </TableCell>
								<TableCell> Lovin </TableCell>
								<TableCell> 111-1111 </TableCell>
								<TableCell> mclovin@gmail.com </TableCell>
								<TableCell align="right">
									<Button type="button" className="close" aria-label="Close">
										<span aria-hidden="true">
											<FaTimes />
										</span>
									</Button>
									<Button type="button" className="close" aria-label="Close">
										<span aria-hidden="true">
											<MdEdit />
										</span>
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
		);
	}
}
