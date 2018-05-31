// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Modal, Card, Icon } from '../../components/common';
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

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getPagedRecordings = this.getPagedRecordings.bind(this);
    this.getRecordings = this.getRecordings.bind(this);

    this.state = {
      isModalOpen: false,
      page: 1,
      recordings: this.getRecordings()
    };
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  getRecordings() {
    const recordingService = new RecordingService();

    return recordingService.getByQuestionId(this.props.question.id);
  }

  getPagedRecordings(page) {
    const index = (page - 1) * 6;
    if (this.state.recordings.length <= index) return [];
    return this.state.recordings.slice(index, index + 6);
  }

  render() {
    const { question } = this.props;
    const { page } = this.state;
    const recordings = this.getPagedRecordings(page);
    const showNext = page * 6 < this.state.recordings.length;
    const showPrevious = page !== 1;

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
                      {recordings
                        .slice(row, row + 3)
                        .map((recording, index) => (
                          <div
                            key={recording.id}
                            className={classNames(
                              mStyles['col'],
                              mStyles['m4']
                            )}
                          >
                            <TrainingGalleryVideo
                              index={ (index + row + 1) + (page - 1) * 6 }
                              recording={recording}
                              onDelete={() =>
                                this.setState({
                                  recordings: this.getRecordings()
                                })
                              }
                            />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
                {showNext && (
                  <div
                    className={classNames(styles['page-arrow'], styles.next)}
                  >
                    <Icon icon={'angle-right'} size={'5x'} onClick={() => {this.setState({ page: page + 1 })}}/>
                  </div>
                )}
                {showPrevious && (
                  <div
                    className={classNames(
                      styles['page-arrow'],
                      styles.previous
                    )}
                  >
                    <Icon icon={'angle-left'} size={'5x'} onClick={() => {this.setState({ page: page -1 })}} />
                  </div>
                )}
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
