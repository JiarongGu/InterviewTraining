import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, CountDown, Modal, Camera } from '../../components/common';

import styles from './TrainingQuestionCamera.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  close?: () => {}
};

type State = {
  recording: boolean,
  error: {}
};

export class TrainingQuestionCamera extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      recording: false,
      error: undefined
    };
  }

  render() {
    const { recording, error } = this.state;

    return (
      <Modal>
        <div className={styles.container}>
          {recording && (
            <Camera
              output={'./data/recordings'}
              onError={error => this.setState({ error })}
              styles={{ video: styles.video }}
              autoPlay
            />
          )}
          {!recording && (
            <Modal>
              {!error && (
                <div className={styles.container}>
                  <div className={styles.alignment}>
                    <div>
                      <CountDown
                        time={3}
                        interval={1000}
                        onComplete={() => this.setState({ recording: true })}
                        className={styles.countDown}
                      />
                    </div>
                  </div>
                </div>
              )}
              {error && <div>Error : {this.state.error.name}</div>}
            </Modal>
          )}
        </div>
      </Modal>
    );
  }
}
