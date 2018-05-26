import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Button,
  CountDown,
  Modal,
  Camera,
  Icon
} from '../../components/common';
import { TrainingQuestionCountDown } from './TrainingQuestionCountDown';

import styles from './TrainingQuestionCamera.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  close?: () => {}
};

type State = {
  mode: string,
  error: {},
  hover: false
};

const COUNT_MODE = 'COUNT_MODE';
const ERROR_MODE = 'ERROR_MODE';
const RECORDING_MODE = 'RECORDING_MODE';
const REVIEW_MODE = 'REVIEW_MODE';

export class TrainingQuestionCamera extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      mode: COUNT_MODE,
      error: undefined,
      hover: false
    };

    this.stopRecording = this.stopRecording.bind(this);
    this.onCountDownCompleted = this.onCountDownCompleted.bind(this);

    this.cameraRef = React.createRef();
  }

  stopRecording(event) {
    this.cameraRef.current.stopRecording().then(filePath => {
      console.log(filePath);
    });
  }

  onCountDownCompleted() {
    this.setState({ mode: RECORDING_MODE }, () => {
      this.cameraRef.current.startRecording();
    });
  }

  render() {
    const { mode, error } = this.state;

    return (
      <Modal>
        <div className={styles.container}>
          <Camera
            ref={this.cameraRef}
            output={'./data/recordings'}
            onError={error => this.setState({ error, mode: ERROR_MODE })}
            styles={{ video: styles.video }}
          />
          <div className={styles.controls}>
            <div className={styles['stop-button']}>
              <div>
                <Icon
                  icon={'stop-circle'}
                  onClick={this.stopRecording}
                  size={'5x'}
                />
              </div>
            </div>
          </div>
          {mode == REVIEW_MODE && ''}
          {mode == ERROR_MODE && ''}
          {mode == COUNT_MODE && (
            <TrainingQuestionCountDown onComplete={this.onCountDownCompleted} />
          )}
        </div>
      </Modal>
    );
  }
}
