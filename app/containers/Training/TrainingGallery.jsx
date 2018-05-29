// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Modal, Card } from '../../components/common';
import { SectionClose } from '../../components/layout';
import { TrainingGalleryVideo } from './TrainingGalleryComponents';

import {
  Question,
  Recording,
  RecordingService,
  FilePaths
} from '../../services';

import styles from './TrainingGallery.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  question: Question
};

type State = {
  isModalOpen: boolean,
  page: number
};

export class TrainingGallery extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      page: 1
    };

    this.recordingService = new RecordingService();
    this.recordings = this.recordingService.getByQuestionId(
      this.props.question.id
    );

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getPagedRecordings = this.getPagedRecordings.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  getPagedRecordings(page) {
    const index = (page - 1) * 6;
    if (this.recordingService.length <= index) return [];
    return this.recordings.slice(index, index + 6);
  }

  render() {
    const { question } = this.props;
    const recordings = this.getPagedRecordings(this.state.page);
    return (
      <div>
        {this.state.isModalOpen && (
          <Modal>
            <div className={styles.container}>
              <SectionClose onConfirm={this.closeModal} />
              <div className={styles.content}>
                <div className={styles.title}>
                  <h2>Takes</h2> <span>{question.question}</span>
                </div>
                <div className={styles.gallery}>
                  {[0, 3].map(row => (
                    <div
                      key={row}
                      className={classNames(mStyles['row'], styles.row)}
                    >
                      {recordings.slice(row, row + 3).map(recording => (
                        <div
                          key={recording.id}
                          className={classNames(mStyles['col'], mStyles['m4'])}
                        >
                          <TrainingGalleryVideo recording={recording} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}
        <div className={styles['view-link']}>
          <a onClick={this.openModal}>View Saved Takes</a>
        </div>
      </div>
    );
  }
}
