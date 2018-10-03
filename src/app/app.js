import React from 'react';

export class App extends React.Component {
  async componentDidMount() {
    const response = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
        process.env.FLICKR_API_KEY
      }&tags=cats&page=1&per_page=10&format=json&nojsoncallback=1`
    );
    const responseJson = await response.json();
    console.log(responseJson);
  }

  render() {
    return <div>{process.env.FLICKR_API_KEY}</div>;
  }
}
