import React from 'react';
import cs from 'classnames';

class ChatPanelHeading extends React.Component {

  static propTypes = {
    disabled: React.PropTypes.bool
  };

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
      messages.push(
        <div key={i}>test</div>
      );
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
          disabled={this.props.disabled}/>
        <ChatPanelBody
          users={this.props.users}
          messages={this.props.messages} />
      </main>
    );
  }
}
