import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContacts from './CreateContacts'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
  }
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  render() {
    return(
      <div className="app">
        <Route exact path="/" render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )}/>
        <Route path="/create" component={CreateContacts}/>
      </div>
    )
  }
}

export default App
