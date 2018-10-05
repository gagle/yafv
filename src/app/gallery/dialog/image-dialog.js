import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getImageDetails, getImagePath } from '../../flickr/flickr';
import { Field } from './field';
import { TagSet } from './tag-set';

const ImageDialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const FieldSet = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding-top: 20px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Loading = styled.span`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export class ImageDialog extends React.Component {
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
    const { image } = this.state;

    /* eslint-disable no-underscore-dangle */

    return (
      <ImageDialogWrapper>
        {image ? (
          <React.Fragment>
            <ImageWrapper>
              <img alt="" src={getImagePath(image)} />
            </ImageWrapper>
            <Footer>
              <TagSet tags={image.tags.tag.map(tag => tag.raw)} />
              <FieldSet>
                <Field name="Title" value={image.title._content} />
                <Field name="Description" value={image.description._content} />
                <Field name="UserName" value={image.owner.username} />
                <Field name="Date taken" value={image.dates.taken} />
                <Field name="Views" value={image.views} />
              </FieldSet>
            </Footer>
          </React.Fragment>
        ) : (
          <Loading>Loading...</Loading>
        )}
      </ImageDialogWrapper>
    );

    /* eslint-enable no-underscore-dangle */
  }
}

ImageDialog.propTypes = {
  id: PropTypes.string.isRequired
};
