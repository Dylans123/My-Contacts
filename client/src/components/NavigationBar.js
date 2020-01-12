import React, { Component } from 'react';
import {
    Navbar,
    NavbarText

} from 'reactstrap';

export default class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    render() {
        return (
                <Navbar color="light" light expand="md">
                    <NavbarText href="/">mycontacts.us</NavbarText>
                </Navbar>
        )
    }
}