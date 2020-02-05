import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
	root: {
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: '40%',
		width: '25%'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
});

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			redirectTo: null
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	onSubmit = event => {
		console.log("Username: " + email)
		console.log("Password: " + password)
		event.preventDefault();
		const { email, password } = this.state;
		axios
			.post("/auth/register", {
				username: email,
				password: password
			})
			.then(response => {
				console.log(response);
				if (!response.data.errmsg) {
					console.log("youre good");
					this.setState({
						redirectTo: "/login"
					});
				} else {
					console.log("duplicate");
				}
			});
		console.log("username: " + email);
	};

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	render() {
		const { redirectTo } = this.state;
		const { classes } = this.props;

		if (redirectTo) {
			return <Redirect to={{ pathname: redirectTo }} />;
		}

		return (
			<div className={classes.root}>
				<Container component={Paper} elevation={6} square className={classes.paper}>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} onSubmit={this.onSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={this.handeChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									onChange={this.handeChange}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-start">
							<Grid item>
								<Link to="/login">Already have an account? Sign in</Link>
							</Grid>
						</Grid>
					</form>
				</Container>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Register);
