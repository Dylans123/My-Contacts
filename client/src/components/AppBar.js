import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	title: {
		flexGrow: 1
	}
});

class NavigationBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}

	render() {
		const { _logout } = this.props;
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							My Contacts
						</Typography>
						<Button color="inherit" onClick={_logout}>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}
export default withStyles(styles, { withTheme: true })(NavigationBar);
