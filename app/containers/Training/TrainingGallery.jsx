import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Modal, Card } from '../../components/common';
import { SectionClose } from '../../components/layout';
import { Question, Recording, RecordingService } from '../../services';

import styles from './TrainingGallery.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  question: Question
};

type State = {
  isModalOpen: boolean
};

export class TrainingGallery extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { question } = this.props;

    return (
      <div>
        {this.state.isModalOpen && (
          <Modal>
            <div className={styles.container}>
              <SectionClose onConfirm={this.closeModal} />
              <div className={styles.content}>
                <h2 className={styles.title}>Takes</h2>
                <span className={styles.question}>{question.question}</span>
                <div className={styles.gallery}>
                  <div className={classNames(mStyles['row'], styles.row)}>
                    <Card size={'m4'} className={styles.col} />
                    <Card size={'m4'} className={styles.col} />
                    <Card size={'m4'} className={styles.col} />
                  </div>
                  <div className={classNames(mStyles['row'], styles.row)}>
                    <Card size={'m4'} className={styles.col} />
                    <Card size={'m4'} className={styles.col} />
                    <Card size={'m4'} className={styles.col} />
                  </div>
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
