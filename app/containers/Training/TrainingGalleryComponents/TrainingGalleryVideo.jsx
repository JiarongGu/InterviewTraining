// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Modal, Card, Icon, VideoPopup } from '../../../components/common';
import { SectionClose } from '../../../components/layout';

import { Recording, FilePaths } from '../../../services';

import styles from './TrainingGalleryVideo.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  recording: Recording,
  className?: string
};

type State = {
  isModalOpen: boolean,
  videoHover: boolean
};

export class TrainingGalleryVideo extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      videoHover: false
    };

    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { recording, className } = this.props;
    const videoSrc = FilePaths.resolve(recording.filePath);
    return (
      <div
        className={classNames(className, styles.container)}
        onMouseLeave={() => {
          this.setState({ videoHover: false });
        }}
      >
        {this.state.videoHover && (
          <div
            className={styles['video-control']}
            onMouseLeave={() => {
              this.setState({ videoHover: false });
            }}
          >
            <div className={styles.alignment}>
              <Icon
                icon={'play-circle'}
                style={'Regular'}
                size={'5x'}
                className={styles['play-btn']}
                onClick={this.openModal}
              />
            </div>
          </div>
        )}
        <div
          className={styles['video-hover']}
          onMouseEnter={() => {
            this.setState({ videoHover: true });
          }}
        />
        <video
          className={styles.video}
          src={videoSrc}
        />

        <span>{recording.created}</span>
        <span>{recording.duration}</span>
        {this.state.isModalOpen && <VideoPopup src={videoSrc} />}
      </div>
    );
  }
}
