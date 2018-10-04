import * as React from 'react';
import styled from 'styled-components';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { ImagePreview } from './image-preview';
import { getImagesByTag, getImagePath } from '../flickr/flickr';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 0 10px;
`;

export class Gallery extends React.Component {
  constructor() {
    super();

    this.state = {
      images: []
    };
  }

  componentDidMount() {
    getImagesByTag('cats', 1, 10)
      .pipe(
        map(images =>
          images.map(image => (
            <ImagePreview
              key={uuid()}
              id={image.id}
              src={getImagePath(image)}
              title={image.title}
            />
          ))
        )
      )
      .subscribe(images =>
        this.setState({
          images
        })
      );
  }

  render() {
    const { images } = this.state;
    return <Container>{images}</Container>;
  }
}
