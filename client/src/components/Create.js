import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
import api from '../api'

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    updateName = (e) => {
        const name = e.target.value;
        this.setState({ name });
    }

    handleCreate = async () => {
        const { name } = this.state
        const payload = { name }

        await api.createContact(payload).then(res => {
            window.alert(`Contact inserted successfully`)
            this.setState({
                name: '',
            })
        })
    }

    render() {
        return (
            <Container>
                <Form frameBorder>
                    <FormGroup row>
                        <Label for="contactFirst" sm={2}>First</Label>
                        <Col sm={10}>
                            <Input type="firstname" name="firstname" id="contactFirst"  onChange={(e) => this.updateName(e)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="contactLast" sm={2}>Last</Label>
                        <Col sm={10}>
                            <Input type="lastname" name="lastname" id="contactLast"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="contactNumber" sm={2}>Phone Number</Label>
                        <Col sm={10}>
                            <Input type="phonenumber" name="phonenumber" id="contactNumber" />
                        </Col>
                    </FormGroup>                    <FormGroup row>
                        <Label for="contactEmail" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="contactEmail" />
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10}}>
                            <Button onClick={() => this.handleCreate()}>
                                Add
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}