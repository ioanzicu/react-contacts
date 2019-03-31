import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContacts from './CreateContacts'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    screen: 'create', //list, create
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
        {this.state.screen === 'list' && (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )}
        {this.state.screen === 'create' && (
          <CreateContacts/>
        )}
      </div>
    )
  }
}

export default App
