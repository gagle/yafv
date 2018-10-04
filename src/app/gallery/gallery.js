import * as React from 'react';
import styled from 'styled-components';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import InfiniteScroll from 'react-infinite-scroller';
import { ImagePreview } from './image-preview';
import { getImagesByTag, getImagePath } from '../flickr/flickr';

const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  flex-flow: row wrap;
  padding: 0 10px 10px 10px;
  align-content: flex-start;
`;

export class Gallery extends React.Component {
  constructor() {
    super();

    this.state = {
      images: [],
      pageSize: 10,
      hasMorePages: true
    };

    this.loadImages = this.loadImages.bind(this);
  }

  loadImages(page) {
    const { pageSize } = this.state;
    getImagesByTag('cats', page, pageSize)
      .pipe(
        map(response => ({
          response,
          nodes: response.photo.map(image => (
            <ImagePreview
              key={uuid()}
              id={image.id}
              src={getImagePath(image)}
              title={image.title}
            />
          ))
        }))
      )
      .subscribe(({ response, nodes }) => {
        const { images: currentImages } = this.state;
        this.setState({
          images: [...currentImages, nodes],
          hasMorePages: response.page < response.pages
        });
      });
  }

  render() {
    const { images, hasMorePages } = this.state;

    return (
      <StyledInfiniteScroll
        pageStart={1}
        loadMore={this.loadImages}
        hasMore={hasMorePages}
      >
        {images}
      </StyledInfiniteScroll>
    );
  }
}
