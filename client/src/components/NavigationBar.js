import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

export default class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    render() {
        const {_logout} = this.props;

        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">mycontacts.us</NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="#" onClick={_logout}>Logout</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}