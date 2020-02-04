import React, { Component } from "react";
import api from "../api";
import Button from "@material-ui/core/Button";

export default class Create extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}

	updateName = e => {
		const name = e.target.value;
		this.setState({ name });
	};

	handleCreate = async () => {
		const { name } = this.state;
		const payload = { name };

		await api.createContact(payload).then(res => {
			window.alert(`Contact inserted successfully`);
			this.setState({
				name: ""
			});
		});
	};

	render() {
		return (
			<Button variant="contained" size="large" color="primary">
				Create Contact
			</Button>
		);
	}
}
