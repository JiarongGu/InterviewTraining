// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Icon, MessageBox } from '../../../components/common';

import { Recording, FilePaths, RecordingService } from '../../../services';

import styles from './TrainingGalleryVideoDelete.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  recording: Recording,
  onDelete?: () => void
};

type State = {
  isModalOpen: boolean
};

export class TrainingGalleryVideoDelete extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.onRecordingDelete = this.onRecordingDelete.bind(this);
    this.recordingService = new RecordingService();
  }

  onRecordingDelete() {
    const { onDelete, recording } = this.props;
    const recordingService = this.recordingService;

    recordingService.delete(recording.id);

    this.setState({ isModalOpen: false }, () => {
      if(onDelete) onDelete();
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div
          className={styles['delete-btn']}
          onClick={() => this.setState({ isModalOpen: true })}
        >
          <Icon icon={'trash-alt'} size={'lg'} />
        </div>
        {this.state.isModalOpen && (
          <MessageBox
            titleText={'Delete Recording'}
            bodyText={`Are you sure want to delete this take created on ${this.props.recording.created}`}
            cancelText={"No, I don't"}
            onCancel={() => this.setState({ isModalOpen: false })}
            confirmText={'Yes, I want'}
            onConfirm={this.onRecordingDelete}
            backdrop={true}
          />
        )}
      </div>
    );
  }
}
