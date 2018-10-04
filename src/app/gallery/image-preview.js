import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getImageDetails } from '../flickr/flickr';

const ImagePreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px 0;
`;

const Image = styled.img`
  max-height: 180px;
  object-fit: contain;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
`;

const Caption = styled.span`
  color: rgba(0, 0, 0, 0.87);
  padding-top: 4px;
`;

const UserNameCaption = styled(Caption)`
  font-weight: 500;
`;

export class ImagePreview extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: ''
    };
  }

  componentDidMount() {
    const { id } = this.props;
    getImageDetails(id).subscribe(image => {
      this.setState({
        userName: image.owner.username
      });
    });
  }

  render() {
    const { src, title } = this.props;
    const { userName } = this.state;

    return (
      <ImagePreviewWrapper>
        <ImageWrapper>
          <Image src={src} />
        </ImageWrapper>
        <Footer>
          <Caption>{title}</Caption>
          {userName && <UserNameCaption>@{userName}</UserNameCaption>}
        </Footer>
      </ImagePreviewWrapper>
    );
  }
}

ImagePreview.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
