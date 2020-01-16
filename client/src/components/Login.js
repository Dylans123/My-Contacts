import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Label, Col, Form, FormGroup, Jumbotron, Button } from 'reactstrap';
import api from '../api';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="col-12 col-sm-6">
                    <Jumbotron>
                        <h1 className="display-3">Welcome Back!</h1>
                        <p className="lead">Fill in your information below to login and view your contacts!</p>
                        <hr className="my-2" />
                        <Form frameBorder onSubmit={this.onSubmit}>
                            <FormGroup row>
                                <Label for="userEmail" sm={3}>Email</Label>
                                <Col sm={9}>
                                    <Input type="email" name="email" id="userEmail" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="userPassword" sm={3}>Password</Label>
                                <Col sm={9}>
                                    <Input type="password" name="password" id="userPassword" />
                                </Col>
                            </FormGroup>
                            <Button type="submit" size='lg' block>Login</Button>
                        </Form>
                        <hr className="my-2" />
                        <p className="lead">Don't have an account yet? Register for one <Link to="/register">here.</Link></p>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}

export default Login;