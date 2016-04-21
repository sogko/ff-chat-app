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

    //welcome message received from the server
    socket.on("welcome", this.handleWelcome.bind(this));

    //chat message from another user
    socket.on("chat", this.handleChat.bind(this));

    //message received that new user has joined the chat
    socket.on("joined", this.handleJoined.bind(this));

    //handle leaving message
    socket.on("left", this.handleLeft.bind(this));

    //keep track of who is online
    socket.on("online", this.handleTrackOnline.bind(this));

  }
  // Invoked immediately before a component is unmounted from the DOM.
  componentWillUnmount() {

    socket.off("connect");
    socket.off("disconnect");
    socket.off("welcome");
    socket.off("chat");
    socket.off("joined");
    socket.off("left");
    socket.off("online");

  }

  /* React component custom methods */

  addMessage(message) {
    let messages = this.state.messages;
    messages.push(message);
    this.setState({
      messages: messages
    })
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
  handleWelcome(msg) {
    console.log("Received welcome message: ", msg);
    this.addMessage({
      type: "welcome_message",
      message: msg
    });

    //  successfully joined chat, so we hide join form and show chat panel
    this.setState({
      disableJoinButton: false,
      showJoinForm: false,
      disableChatButton: false,
      showChatPanel: true
    });
  }
  handleChat(msg) {
    console.log("Received message: ", msg);

    this.addMessage({
      type: "chat_message",
      username: msg.user.name,
      message: msg.message
    });
  }
  handleJoined(user) {
    console.log(user.name + " joined the chat.");

    this.addMessage({
      type: "join_message",
      username: user.name
    });
  }
  handleLeft(user) {
    console.log(user.name + " left the chat.");

    this.addMessage({
      type: "left_message",
      username: user.name
    });
  }
  handleTrackOnline(connections) {
    console.log("Connections: ", connections);

    // collect usernames of users thats connected to the server
    var users = [];
    for (var i=0; i< connections.length; ++i){
      if ( connections[i].user ) {
        users.push(connections[i].user.name);
      }
    }

    this.setState({
      users: users
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
