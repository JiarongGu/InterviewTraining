// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { VideoFramePopup } from '../../../components/common';
import { SectionClose } from '../../../components/layout';
import { TrainingExampleImageHoverOverLay } from './TrainingExampleImageHoverOverLay';

import { Example, FilePaths } from '../../../services';

import styles from './TrainingExampleImage.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  example: Example
};

type State = {
  mouseEnter: boolean,
  isVideoModalOpen: boolean
};

export class TrainingExampleImage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      mouseEnter: false,
      isVideoModalOpen: false
    };
  }

  render() {
    const { example } = this.props;
    const imageSrc = FilePaths.resolve(example.img);
    const videoSrc = example.src;
    return (
      <div
        className={styles.container}
        onMouseEnter={() => this.setState({ mouseEnter: true })}
        onMouseLeave={() => this.setState({ mouseEnter: false })}
      >
        <TrainingExampleImageHoverOverLay
          parentEntered={this.state.mouseEnter}
          onPlayClick={() => {
            this.setState({ isVideoModalOpen: true });
          }}
        />
        <img className={styles.image} src={imageSrc} />

        {this.state.isVideoModalOpen && (
          <VideoFramePopup
            src={`${videoSrc}?autoplay=1`}
            onClose={() => this.setState({ isVideoModalOpen: false })}
          />
        )}
      </div>
    );
  }
}
