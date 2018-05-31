// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Modal,
  Card,
  Icon,
  VideoPopup,
  MessageBox
} from '../../../components/common';
import { SectionClose } from '../../../components/layout';
import { TrainingGalleryVideoHoverOverLay } from './TrainingGalleryVideoHoverOverLay';
import { TrainingGalleryVideoDelete } from './TrainingGalleryVideoDelete';

import { Recording, FilePaths } from '../../../services';

import styles from './TrainingGalleryVideo.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  index: number,
  recording: Recording,
  className?: string,
  onDelete?: () => void
};

type State = {
  mouseEnter: boolean,
  isVideoModalOpen: boolean
};

function formatSeconds(seconds) {
  const minutesDisplay = Math.floor(seconds / 60);
  const secondsInMinute = '000000000' + Math.floor(seconds % 60);
  const secondsDisplay = secondsInMinute.substr(secondsInMinute.length - 2);

  return `${minutesDisplay}:${secondsDisplay}`;
}

export class TrainingGalleryVideo extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      mouseEnter: false,
      isVideoModalOpen: false
    };
  }

  render() {
    const { recording, className, index, onDelete } = this.props;
    const videoSrc = FilePaths.resolve(recording.filePath);

    return (
      <div
        className={classNames(className, styles.container)}
        onMouseEnter={() => this.setState({ mouseEnter: true })}
        onMouseLeave={() => this.setState({ mouseEnter: false })}
      >
        <TrainingGalleryVideoHoverOverLay
          parentEntered={this.state.mouseEnter}
          onPlayClick={() => {
            this.setState({ isVideoModalOpen: true });
          }}
        />
        <video className={styles.video} src={videoSrc} />
        <span className={styles['created-time']}>{recording.created}</span>
        {/* <div className={styles.index}>{index}</div> */}
        <div className={styles.duration}>
          <span>{formatSeconds(recording.duration)}</span>
        </div>

        <TrainingGalleryVideoDelete
          recording={recording}
          onDelete={onDelete}
        />

        {this.state.isVideoModalOpen && (
          <VideoPopup
            src={videoSrc}
            duration={recording.duration}
            type={'video/webm'}
            onClose={() => this.setState({ isVideoModalOpen: false })}
          />
        )}
      </div>
    );
  }
}
