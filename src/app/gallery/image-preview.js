import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getImageDetails } from '../flickr/flickr';

const ImagePreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px 0;

  @media screen and (max-width: 600px) {
    align-items: center;
  }
`;

const Image = styled.img`
  max-height: 180px;

  object-fit: contain;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    max-height: 300px;
    max-width: 500px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;

  @media screen and (max-width: 600px) {
    align-items: center;
  }
`;

const Caption = styled.span`
  padding-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserNameCaption = styled(Caption)`
  font-weight: 500;
  padding-bottom: 4px;
`;

export class ImagePreview extends React.Component {
  constructor() {
    super();

    this.state = {
      image: null
    };
  }

  componentDidMount() {
    const { id } = this.props;
    getImageDetails(id).subscribe(image => {
      this.setState({
        image
      });
    });
  }

  render() {
    const { src, title, onClick } = this.props;
    const { image } = this.state;

    /* eslint-disable no-underscore-dangle */

    const url = image ? image.urls.url[0]._content : null;

    /* eslint-enable no-underscore-dangle */

    return (
      <ImagePreviewWrapper>
        <ImageWrapper>
          <Image src={src} onClick={onClick} />
        </ImageWrapper>
        <Footer>
          <Caption>{title}</Caption>
          {image && (
            <React.Fragment>
              <UserNameCaption>@{image.owner.username}</UserNameCaption>
              <span>
                <a href={url} target="_blank">
                  Flickr
                </a>
              </span>
            </React.Fragment>
          )}
        </Footer>
      </ImagePreviewWrapper>
    );
  }
}

ImagePreview.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
