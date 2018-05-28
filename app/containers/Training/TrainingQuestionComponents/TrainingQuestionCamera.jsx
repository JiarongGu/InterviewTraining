import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  CountDown,
  CountDownTime,
  Modal,
  Camera,
  Icon
} from '../../../components/common';
import { TrainingQuestionCountDown } from './TrainingQuestionCountDown';

import styles from './TrainingQuestionCamera.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';
import { FilePaths, RecordingService } from '../../../services';

type Props = {
  history?: object,
  index: number
};

type State = {
  mode: string,
  error: {},
  question: { id: string, question: string, takes: number, time: number },
  recordingService: RecordingService
};

const COUNT_MODE = 'COUNT_MODE';
const ERROR_MODE = 'ERROR_MODE';
const RECORDING_MODE = 'RECORDING_MODE';

function getRecordingInfo(filePath, questionId) {
  var filename = filePath.replace(/^.*[\\\/]/, '');
  var duration = parseFloat(filename.split('.')[1]) / 1000;
  var id = filename.split('.')[0];
  var relativePath = FilePaths.relative(filePath);
  return { id, filePath: relativePath, duration, questionId };
}

class TrainingQuestionCameraComponent extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      mode: COUNT_MODE,
      error: undefined,
      question: {},
      recordingService: new RecordingService()
    };

    this.stopRecording = this.stopRecording.bind(this);
    this.onCountDownCompleted = this.onCountDownCompleted.bind(this);

    this.cameraRef = React.createRef();
    this.timerRef = React.createRef();
  }

  stopRecording(event) {
    const {
      question: { id },
      index,
      history
    } = this.props;
    const { recordingService } = this.state;
    this.cameraRef.current.stopRecording().then(filePath => {
      const recording = getRecordingInfo(filePath, id);
      recordingService.insert(recording);
      history.push(
        `/training/question/${index}/recording/${recording.id}/retake`
      );
    });
  }

  onCountDownCompleted() {
    this.setState({ mode: RECORDING_MODE }, () => {
      this.cameraRef.current.startRecording();
      this.timerRef.current.start();
    });
  }

  render() {
    const { mode, error } = this.state;
    const { question } = this.props;
    return (
      <Modal>
        <div className={styles.container}>
          <Camera
            ref={this.cameraRef}
            output={FilePaths.resolve(FilePaths.dirDataRecordings)}
            onError={error => this.setState({ error, mode: ERROR_MODE })}
            styles={{ video: styles.video }}
          />
          <div className={styles.controls}>
            <CountDownTime
              className={styles.timer}
              minutes={question.time}
              ref={this.timerRef}
              onComplete={this.stopRecording}
            />
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
          {mode == ERROR_MODE && ''}
          {mode == COUNT_MODE && (
            <TrainingQuestionCountDown onComplete={this.onCountDownCompleted} />
          )}
        </div>
      </Modal>
    );
  }
}

export const TrainingQuestionCamera = withRouter(
  TrainingQuestionCameraComponent
);
