import React, { Component } from "react";
import axios from "axios";
import Create from "./Create";
import ContactsList from "./ContactsList";
import AppBar from "./AppBar";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedIn: false
    };
    this._logout = this._logout.bind(this);
  }

  _logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios.post("/auth/logout").then(response => {
      console.log(response.data);
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null
        });
        window.location.href = "/login";
      }
    });
  }

  componentDidMount() {
    axios.get("/auth/user").then(response => {
      console.log(response.data);
      if (!!response.data.user) {
        console.log("THERE IS A USER");
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      } else {
        this.setState({
          loggedIn: false,
          user: null
        });
        window.location.href = "/login";
      }
    });
  }

  render() {
    const { user } = this.state;
    console.log(user === null);
    if (user) {
      return (
        <div>
          <AppBar _logout={this._logout} />
          <Create />
          <ContactsList />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Contacts;
