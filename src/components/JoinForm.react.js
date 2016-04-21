import React from 'react';
import cs from 'classnames';

export class JoinForm extends React.Component {

  static propTypes = {
    onSubmit: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    show: React.PropTypes.bool
  };

  handleClickJoin(event) {

    //halt default form behaviour
    event.preventDefault();

    // get value of username from input using refs
    const username = this.refs.username.value;

    // check if username is empty
    if ( username.length === 0 ) {
      return false;
    }

    // pass user object to onSubmit handler
    if (this.props.onSubmit) {
      this.props.onSubmit(username);
    }

    return false;
  }

  render() {

    // use component props values to construct classnames for HTML element
    var joinFormClass = cs('well', {
      hidden: !this.props.show
    });

    return (
      <section id="join" className={joinFormClass}>
        <form id="JoinForm" className="form-inline text-right">
          <fieldset>
            <input ref="username" type="text" className="form-control " placeholder="Your name" autocomplete="off" required="required" autofocus="autofocus" />
            <button ref="joinButton"
                    id="sendJoin"
                    className="btn btn-success"
                    disabled={this.props.disabled}
                    onClick={this.handleClickJoin.bind(this)}>Join</button>
          </fieldset>
        </form>
      </section>
    );
  }
}
