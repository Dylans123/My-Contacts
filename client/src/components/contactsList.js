import React, { Component } from 'react';
import { Table } from 'reactstrap';
export default class ContactsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

        render() {
            return (
                <div>
                    <Table hover borderless>
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
                            </tr>
                            <tr>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>222-2222</td>
                                <td>jthorn@gmail.com</td>
                            </tr>
                            <tr>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>333-3333</td>
                                <td>thebird@gmail.com</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )
        }
}