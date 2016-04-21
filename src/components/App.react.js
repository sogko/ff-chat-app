import React from 'react';

import { Heading } from './Heading.react'
import { ChatPanel } from './ChatPanel.react'
import { JoinForm } from './JoinForm.react'

export class App extends React.Component {
  constructor(props) {
    super(props);

    // connection to our socket server
    this.socket = io(window.location.host);
    
    // initial App state
    this.state = {

      // current user state
      user: {
        name: "anon"
      },

      // whether socket connection has been established
      isConnected: false,

      // flags to show/hide component elements
      disableJoinButton: false,
      showJoinForm: true,
      disableChatButton: false,
      showChatPanel: false,

      // list of chat messages to be displayed in the chat panel
      messages: [],

      // list of users connected to the same socket server
      users: ["user1", "user2"]
    };
  }

  /* React component lifecycle methods */

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  componentDidMount() {

    //handle connecting to and disconnecting from the chat server
    this.socket.on("connect", this.handleConnect.bind(this));
    this.socket.on("disconnect", this.handleConnect.bind(this));

    //welcome message received from the server
    this.socket.on("welcome", this.handleWelcome.bind(this));

    //chat message from another user
    this.socket.on("chat", this.handleChat.bind(this));

    //message received that new user has joined the chat
    this.socket.on("joined", this.handleJoined.bind(this));

    //handle leaving message
    this.socket.on("left", this.handleLeft.bind(this));

    //keep track of who is online
    this.socket.on("online", this.handleTrackOnline.bind(this));

  }
  // Invoked immediately before a component is unmounted from the DOM.
  componentWillUnmount() {

    this.socket.off("connect");
    this.socket.off("disconnect");
    this.socket.off("welcome");
    this.socket.off("chat");
    this.socket.off("joined");
    this.socket.off("left");
    this.socket.off("online");

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
    console.log(this.state.user.name + " joined the chat.");

    this.addMessage({
      type: "join_message",
      username: this.state.user.name
    });
  }
  handleLeft(user) {
    console.log(this.state.user.name + " left the chat.");

    this.addMessage({
      type: "left_message",
      username: this.state.user.name
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
  handleSubmitJoin(username) {
    let user = this.state.user;
    user.name = username;

    // when user click Join button on the JoinForm, tell socket.io to let this user join the chat
    console.log("Joining chat with name: ", username);
    this.socket.emit("join", user);

    // disable join button when user click Join
    this.setState({
      user: user,
      disableJoinButton: true
    });
  }
  handleSubmitMessage(message) {
    // when user click submit button on the MessageForm in ChatPanel, send the message to socket.io
    console.log("Sending message: ", message);
    this.socket.emit("chat", message);

    this.addMessage({
      type: "current_user_chat_message",
      message: message
    });
  }

  render() {
    return (
      <div className="app-container">
        <Heading
          isConnected={this.state.isConnected}>WDISG2 Chat</Heading>
        <JoinForm
          onSubmit={this.handleSubmitJoin.bind(this)}
          disabled={this.state.disableJoinButton}
          show={this.state.showJoinForm}/>
        <ChatPanel
          onSubmit={this.handleSubmitMessage.bind(this)}
          disabled={this.state.disableChatButton}
          users={this.state.users}
          messages={this.state.messages}
          show={this.state.showChatPanel}/>
      </div>
    );
  }
}
