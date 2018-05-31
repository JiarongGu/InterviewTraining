// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Modal, Card, Icon, VideoPopup, MessageBox } from '../../../components/common';
import { SectionClose } from '../../../components/layout';
import { TrainingGalleryVideoHoverOverLay } from './TrainingGalleryVideoHoverOverLay';

import { Recording, FilePaths } from '../../../services';

import styles from './TrainingGalleryVideo.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  recording: Recording,
  className?: string,
  onDeleted?: () => void
};

type State = {
  mouseEnter: boolean,
  isVideoModalOpen: boolean,
  idDeleteModalOpen: boolean
};

export class TrainingGalleryVideo extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      mouseEnter: false,
      isVideoModalOpen: false,
      idDeleteModalOpen: false
    };

    this.onRecordingDelete = this.onRecordingDelete.bind(this);
  }

  render() {
    const { recording, className } = this.props;
    const videoSrc = FilePaths.resolve(recording.filePath);

    onRecordingDelete() {

    }

    return (
      <div
        className={classNames(className, styles.container)}
        onMouseEnter={() => this.setState({ mouseEnter: true })}
        onMouseLeave={() => this.setState({ mouseEnter: false })}
      >
        <TrainingGalleryVideoHoverOverLay
          parentEntered={this.state.mouseEnter}
          onPlayClick={() => { this.setState({ isVideoModalOpen: true }) }}
        />
        <video
          className={styles.video}
          src={videoSrc}
        />
        <span>{recording.created}</span>
        <span>{recording.duration}</span>
        
        <div
          className={styles['delete-btn']}
          onClick={() => this.setState({ idDeleteModalOpen: true })}
        >
          <Icon icon={'trash-alt'} size={'lg'} />
        </div>
        {this.state.idDeleteModalOpen && 
          <MessageBox 
            titleText={'Delete Recording'}
            bodyText={'Are you sure want to delete.'}
            cancelText={'No, I don\'t'}
            onCancel={() => this.setState({ idDeleteModalOpen: false })}
            confirmText={'Yes, I want'}
            onConfirm={this.onRecordingDelete}
            backdrop={true}
          />
        }

        {this.state.isVideoModalOpen &&
          <VideoPopup
            src={videoSrc}
            duration={recording.duration}
            type={'video/webm'}
          />
        }
      </div>
    );
  }
}
