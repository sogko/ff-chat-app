import React from 'react';
import cs from 'classnames';

class ChatPanelHeading extends React.Component {

  static propTypes = {
    onSubmit: React.PropTypes.func,
    disabled: React.PropTypes.bool
  };

  handleClickSubmit(event) {
    //halt default form behaviour
    event.preventDefault();

    // get value of message from input
    const message = this.refs.message.value;

    // check if message is empty
    if (!message.length) {
      return false;
    }

    // pass message string to onSubmit handler
    if (this.props.onSubmit) {
      this.props.onSubmit(message);
    }

    // reset message input value
    this.refs.message.value = "";
    return false;
  }

  render() {
    return (
      <div className="panel-heading">
        <form id="MessageForm" className="form-inline text-right">
          <fieldset>
            <input
              ref="message"
              type="text"
              className="form-control "
              placeholder="say what?"
              autocomplete="off"
              required="required"
              autofocus="autofocus"
            />
            <button
              id="sendMessage"
              className="btn btn-success"
              disabled={this.props.disabled}
              onClick={this.handleClickSubmit.bind(this)}
            >Send</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

class ConnectedUsersList extends React.Component {

  static propTypes = {
    users: React.PropTypes.array
  };

  render() {
    return <small id="connected">{this.props.users}</small>;
  }
}
class MessageList extends React.Component {

  static propTypes = {
    messages: React.PropTypes.array
  };

  renderMessages() {
    let messages = [];
    for (var i = this.props.messages.length - 1; i >= 0; i--) {
      const msg = this.props.messages[i];
      switch (msg.type) {
        case "welcome_message": {
          messages.push(
            <div key={i} class="text-center messages-welcome">
              <strong>{msg.message}</strong>
            </div>
          );
          break;
        }
        case "chat_message": {
          messages.push(
            <div key={i} className="alert alert-success">
              <strong>{msg.username}:</strong> {msg.message}
            </div>
          );
          break;
        }
        case "current_user_chat_message": {
          //attach clients own message in a different style
          messages.push(
            <div key={i} className="alert alert-info text-right">
              {msg.message}
            </div>
          );
          break;
        }
        case "join_message": {
          messages.push(
            <div key={i} className="text-center">
              <strong>{msg.username}:</strong> joined the chat.
            </div>
          );
          break;
        }
        case "left_message": {
          messages.push(
            <div key={i} className="text-center">
              <strong>{msg.username}:</strong> left the chat.
            </div>
          );
          break;
        }
      }
    }
    return messages;
  }
  render() {
    return (
      <div id="messages">
        {this.renderMessages()}
      </div>
    );
  }
}

class ChatPanelBody extends React.Component {

  static propTypes = {
    users: React.PropTypes.array,
    messages: React.PropTypes.array
  };

  render() {
    return (
      <section className="panel-body">
        <div className="text-center">
          <ConnectedUsersList users={this.props.users}/>
        </div>
        <hr/>
        <MessageList messages={this.props.messages}/>
      </section>
    );
  }
}

export class ChatPanel extends React.Component {

  static propTypes = {
    onSubmit: React.PropTypes.func,
    users: React.PropTypes.array,
    messages: React.PropTypes.array,
    disabled: React.PropTypes.bool,
    show: React.PropTypes.bool
  };

  render() {
    // use component props values to construct classnames for HTML element
    var mainClass = cs('panel panel-default', {
      hidden: !this.props.show
    });

    return (
      <main className={mainClass}>
        <ChatPanelHeading
          onSubmit={this.props.onSubmit}
          disabled={this.props.disabled}/>
        <ChatPanelBody
          users={this.props.users}
          messages={this.props.messages} />
      </main>
    );
  }
}
