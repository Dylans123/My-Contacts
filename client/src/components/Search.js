import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import api from "../api";

export default class Create extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}

	render() {
		return (
			<TextField
				fullWidth
				id="outlined-search"
				label="Search field"
				type="search"
				variant="outlined"
			/>
		);
	}
}
