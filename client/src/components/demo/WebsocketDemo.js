import React, {Component} from 'react';
import {SERVER_URL} from '../../config';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebSocketDemo extends Component {
  constructor() {
    super();

    this.state = {responses: []};
  }

  componentDidMount() {
    console.log('componentDidMount...');
    const socket = new SockJS(`${SERVER_URL}/stomp`);
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        client.subscribe('/topic/valves', data => {
          const response = JSON.parse(data.body).values[0].content;
          console.log(response);

          const responses = this.state.responses;

          responses.push(
            `${response.length} Records received at ${new Date().toTimeString()}`
          );
          this.setState(responses);
        });
      },
      () => {
        console.error('unable to connect');
      }
    );
  }

  render() {
    const {responses} = this.state;

    return (
      <div className="demo">
        <ul>{responses.map((r, i) => <li key={i}>{r}</li>)}</ul>
      </div>
    );
  }
}

export default WebSocketDemo;
