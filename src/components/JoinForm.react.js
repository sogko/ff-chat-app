import React from 'react';
import cs from 'classnames';

export class JoinForm extends React.Component {
  
  static propTypes = {
    disabled: React.PropTypes.bool,
    show: React.PropTypes.bool
  };

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
                    disabled={this.props.disabled}>Join</button>
          </fieldset>
        </form>
      </section>
    );
  }
}
