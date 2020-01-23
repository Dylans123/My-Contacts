import React, { Component } from 'react';
import { Table, Input, Row, Col, Button } from 'reactstrap';
import api from '../api'
import { MdEdit } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";



export default class ContactsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contactsarray: [],
        }
    }

    getContacts = () => {
        api.getContact().then(res => {

            this.setState({
                name: '',
                contactsarray: res.data,
            })

            console.log(this.state.contactsarray)
            
            if (!res.data.errmsg) {
                console.log('Data fetched')
            } else {
                console.log('Error fetching data')
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    contactList() {
        return this.state.contactsarray.map(function (currentContact, i) {
            return (
                <tr>
                    <td>  {currentContact.name} </td>
                    <td>  Lastnamefiller </td>
                    <td>  111-1111 </td>
                    <td>  email@gmail.com </td>
                    <td>
                        <button type="button" className="close" aria-label="Close">
                            <span aria-hidden="true"><FaTimes /></span>
                        </button>
                        <button type="button" className="close" aria-label="Close">
                            <span aria-hidden="true"><MdEdit /></span>
                        </button>
                    </td>
                </tr>
            );
        })
    }

    render() {
            return (
                <div>
                    <Col >
                        <Input type="firstname" name="firstname" id="contactFirst" onChange={(e) => this.updateName(e)} />
                    </Col>
                    <Button type="button" onClick={() => this.getContacts()}>
                        <MdRefresh />
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
                                    <button type="button" className="close" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </td>
                            </tr>
                            {this.contactList()}
                        </tbody>
                    </Table>
                </div>
            )
        }
}