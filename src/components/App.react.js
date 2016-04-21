import React from 'react';

import { Heading } from './Heading.react'
import { ChatPanel } from './ChatPanel.react'
import { JoinForm } from './JoinForm.react'

export class App extends React.Component {
  constructor(props) {
    super(props);

    // initial App state
    this.state = {

      // whether socket connection has been established
      isConnected: false,

      // flags to show/hide component elements
      disableJoinButton: false,
      showJoinForm: true,
      disableChatButton: true,
      showChatPanel: true,

      // list of chat messages to be displayed in the chat panel
      messages: ["testmessage1", "testmessage2"],

      // list of users connected to the same socket server
      users: ["user1", "user2"]
    };
  }

  /* React component lifecycle methods */

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  componentDidMount() {
    // register listeners
  }
  // Invoked immediately before a component is unmounted from the DOM.
  componentWillUnmount() {
    // remove listeners
  }

  render() {
    return (
      <div className="app-container">
        <Heading
          isConnected={this.state.isConnected}>WDISG2 Chat</Heading>
        <JoinForm
          disabled={this.state.disableJoinButton}
          show={this.state.showJoinForm}/>
        <ChatPanel
          disabled={this.state.disableChatButton}
          users={this.state.users}
          messages={this.state.messages}
          show={this.state.showChatPanel}/>
      </div>
    );
  }
}
