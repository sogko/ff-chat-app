import React from 'react';

class HeadingStatus extends React.Component {

  static propTypes = {
    isConnected: React.PropTypes.bool
  };

  render() {
    if (this.props.isConnected) {
      return <span className="label label-success heading--status">connected</span>
    } else {
      return <span className="label label-danger heading--status">disconnected</span>
    }
  }
}

export class Heading extends React.Component {

  static propTypes = {
    isConnected: React.PropTypes.bool
  };

  render() {
    return <h1 className="heading">{this.props.children} <HeadingStatus isConnected={this.props.isConnected}/></h1>;
  }
}