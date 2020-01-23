import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Create from './Create';
import ContactsList from './ContactsList';
import axios from 'axios';

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loggedIn: false,
        }
    }

    componentDidMount() {
        axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
                    user: response.data.user,
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
                })
                window.location.href = '/login';
			}
		})
    }

    render() {
        const { user } = this.state;
        console.log(user === null);
        if (user) {
            return (
                <Container>
                    <Create />
                    <ContactsList />
                </Container>
            )
        } else {
            return null;
        }
    }
}

export default Contacts;