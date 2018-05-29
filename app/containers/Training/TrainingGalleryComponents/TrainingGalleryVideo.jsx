// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Modal, Card } from '../../../components/common';
import { SectionClose } from '../../../components/layout';
import { Recording, FilePaths } from '../../../services';

import styles from './TrainingGalleryVideo.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  recording: Recording,
  className: string
};

type State = {
  isOpen: boolean
};

export class TrainingGalleryVideo extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { recording, className } = this.props;
    return (
      <div className={classNames(className, styles.container)}>
        <video
          className={styles.video}
          src={FilePaths.resolve(recording.filePath)}
        />
        <span>
            {recording.created}
        </span>
        <span>
            {recording.duration}
        </span>
      </div>
    );
  }
}
