import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		display: 'flex',
		direction:"column",
		justifyContent:"center",
		alignItems:"center",
		height: "100vh"
	},
	gridContainer: {
		width: '60%',
		height: '60%',
	},
	image: {
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "dark"
				? theme.palette.grey[900]
				: theme.palette.grey[50],
		backgroundSize: "cover",
		backgroundPosition: "center"
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: theme.spacing(100),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
});

class Login extends Component {
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

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	onSubmit(event) {
		event.preventDefault();
		const { email, password } = this.state;
		const { _login } = this.props;
		console.log("handleSubmit");
		_login(email, password);
	}

	render() {
		const { redirectTo, email, password } = this.state;

		const { classes } = this.props;

		if (redirectTo) {
			return <Redirect to={{ pathname: redirectTo }} />;
		}

		return (
			<div
				className={classes.root}
			>
				<Grid container component={Paper} elevation={6} square className={classes.gridContainer} spacing={10}>
					<Grid item xl={4} lg={4} md={4} sm={4} xs={4} className={classes.paper}>
						<Typography component="h1" variant="h4">
							Welcome!
						</Typography>
						<form
							className={classes.form}
							xs={12}
							noValidate
							onSubmit={this.onSubmit}
						>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={email}
								autoComplete="email"
								autoFocus
								onChange={this.handleChange}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								value={password}
								autoComplete="current-password"
								onChange={this.handleChange}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								disableElevation
							>
								Sign In
							</Button>
								<Grid item>
									<Link to="/register">{"Don't have an account? Sign Up"}</Link>
								</Grid>
						</form>
					</Grid>
					<Grid item xl={8} lg={8} md={8} sm={8} xs={8} component={Paper} className={classes.image}></Grid>
				</Grid>
			</div>
		);
	}
}
export default withStyles(styles, { withTheme: true })(Login);
