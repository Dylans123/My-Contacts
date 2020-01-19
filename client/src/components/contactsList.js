import React, { Component } from 'react';
import { Table, Input, Row, Col, Button } from 'reactstrap';
import api from '../api'
import axios from 'axios'

export default class ContactsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contactsarray: '',
        }
    }
    namsfe = 'asdrt';
    getContacts = () => {
        api.getContact().then(res => {
            //console.log(res)
            this.state.contactsarray = res.data
            console.log(this.contactsarray)
            
            if (!res.data.errmsg) {
                console.log('Data fetched')
            } else {
                console.log('Error fetching data')
            }
        })
    }

    componentDidMount() {
        this.getContacts();
    }

    render() {
        const { contacts } = this.state.contactsarray;
            return (
                <div>
                    <Col >
                        <Input type="firstname" name="firstname" id="contactFirst" onChange={(e) => this.updateName(e)} />
                    </Col>
                    <Button type="button" onClick={() => this.getContacts()}>
                     Refresh
                    </Button>
                    <Table hover borderless responsive>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>111-1111</td>
                                <td>motto@gmail.com</td>
                                <td>
                                    <button type="button" class="close" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </td>
                            </tr>
                            {contacts.map(({ contact, key }) => (
                                    <tr>
                                    <td>{contact}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )
        }
}