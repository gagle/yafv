import React from 'react';

export class App extends React.Component {
  a = 2;

  render() {
    return <div>{process.env.FLICKR_API_KEY}</div>;
  }
}
