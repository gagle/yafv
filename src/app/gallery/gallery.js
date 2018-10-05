import * as React from 'react';
import styled from 'styled-components';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import InfiniteScroll from 'react-infinite-scroller';
import Modal from 'react-modal';
import { ImagePreview } from './image-preview';
import { ImageDialog } from './dialog/image-dialog';
import { getImagesByTag, getImagePath } from '../flickr/flickr';

const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  flex-flow: row wrap;
  padding: 0 10px 10px 10px;
  align-content: flex-start;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export class Gallery extends React.Component {
  constructor() {
    super();

    this.state = {
      images: [],
      pageSize: 10,
      hasMorePages: true,
      isDialogOpened: false,
      dialogImageId: null
    };

    this.loadImages = this.loadImages.bind(this);
    this.openImageDialog = this.openImageDialog.bind(this);
    this.closeImageDialog = this.closeImageDialog.bind(this);
    this.escKeyHandler = this.escKeyHandler.bind(this);
  }

  escKeyHandler(event) {
    if (event.keyCode === 27) {
      this.closeImageDialog();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escKeyHandler, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escKeyHandler, false);
  }

  openImageDialog(imageId) {
    this.setState({ isDialogOpened: true, dialogImageId: imageId });
  }

  closeImageDialog() {
    this.setState({ isDialogOpened: false });
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
              onClick={() => {
                this.openImageDialog(image.id);
              }}
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
    const { images, hasMorePages, isDialogOpened, dialogImageId } = this.state;

    return (
      <React.Fragment>
        <Modal
          isOpen={isDialogOpened}
          style={{
            overlay: {
              ...Modal.defaultStyles.overlay,
              display: 'flex',
              alignItems: 'center'
            },
            content: {
              ...Modal.defaultStyles.content,
              height: 'fit-content',
              position: 'initial',
              margin: 'auto'
            }
          }}
          onRequestClose={this.closeImageDialog}
          shouldCloseOnOverlayClick
        >
          {isDialogOpened && <ImageDialog id={dialogImageId} />}
        </Modal>
        <StyledInfiniteScroll
          pageStart={1}
          loadMore={this.loadImages}
          hasMore={hasMorePages}
        >
          {images}
        </StyledInfiniteScroll>
      </React.Fragment>
    );
  }
}
