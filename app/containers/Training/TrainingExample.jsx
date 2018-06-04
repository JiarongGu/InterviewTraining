import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { SectionClose } from '../../components/layout';
import { Modal, Card, Icon } from '../../components/common';

import { TrainingExampleImage } from './TrainingExampleComponents';

import styles from './TrainingExample.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  question: Question
};

type State = {
  isModalOpen: boolean
};

export class TrainingExample extends Component<Props> {
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
    const examples = this.props.question.examples;
    console.log('Examples:: ', examples);
    return (
      <div>
        {this.state.isModalOpen && (
          <Modal>
            <div className={styles.container}>
              <SectionClose onConfirm={this.closeModal} />
              <div className={styles.content}>
                <div className={styles.gallery}>
                  {[0, 3].map(row => (
                    <div
                      key={`row-${row}`}
                      className={classNames(mStyles['row'], styles.row)}
                    >
                      {examples
                        .slice(row, row + 3)
                        .map((example, index) => (
                          <div
                            key={`col-${index}`}
                            className={classNames(
                              mStyles['col'],
                              mStyles['m4']
                            )}
                          >
                          <TrainingExampleImage example={example} />
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
          <a onClick={this.openModal}>Watch Examples</a>
        </div>
      </div>
    );
  }
}
