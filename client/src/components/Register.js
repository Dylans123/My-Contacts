import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Label, Col, Form, FormGroup, Jumbotron, Button } from 'reactstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
// import api from '../api';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirm: '',
            redirectTo: null,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        axios
        .post('/auth/register', {
            username: email,
            password: password
        })
        .then(response => {
            console.log(response)
            if (!response.data.errmsg) {
                console.log('youre good')
                this.setState({
                    redirectTo: '/login'
                })
            } else {
                console.log('duplicate')
            }
        })
        console.log('username: ' + email);
    }

    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

    render() {
        const { email, password, confirm, redirectTo } = this.state;

        if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        
        return (
            <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="col-12 col-sm-6">
                    <Jumbotron>
                        <h1 className="display-3">Register</h1>
                        <p className="lead">Create an account below to begin keeping track of contacts!</p>
                        <hr className="my-2" />
                        <Form frameBorder onSubmit={this.onSubmit}>
                            <FormGroup row>
                                <Label for="userEmail" sm={3}>Email</Label>
                                <Col sm={9}>
                                    <Input type="email" name="email" id="userEmail" value={email} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="userPassword" sm={3}>Password</Label>
                                <Col sm={9}>
                                    <Input type="password" name="password" id="userPassword" value={password} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="userConfirm" sm={3}>Confirm Password</Label>
                                <Col sm={9}>
                                    <Input type="password" name="confirm" id="userConfirm" value={confirm} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                            <Button type="submit" size='lg' block>Register</Button>
                        </Form>
                        <hr className="my-2" />
                        <p className="lead">Already have an account? Login to it <Link to="/login">here.</Link></p>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}

export default Register;