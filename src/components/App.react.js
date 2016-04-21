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
      disableChatButton: false,
      showChatPanel: false,

      // list of chat messages to be displayed in the chat panel
      messages: ["testmessage1", "testmessage2"],

      // list of users connected to the same socket server
      users: ["user1", "user2"]
    };
  }

  /* React component lifecycle methods */

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  componentDidMount() {

    //handle connecting to and disconnecting from the chat server
    socket.on("connect", this.handleConnect.bind(this));
    socket.on("disconnect", this.handleConnect.bind(this));

  }
  // Invoked immediately before a component is unmounted from the DOM.
  componentWillUnmount() {

    socket.off("connect");
    socket.off("disconnect");

  }

  /* React component event handler methods */

  handleConnect() {
    console.log("Connected to Chat Socket");
    this.setState({
      isConnected: true
    });
  }
  
  handleDisconnect() {
    console.log("Disconnected from Chat Socket");
    this.setState({
      isConnected: false
    });
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
