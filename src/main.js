import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App.react';


// Globals (meh)
socket = global.socket = io(window.location.host);
user = global.user = {
  name: "anon"
};

ReactDOM.render(<App/>, document.getElementById('container'));
