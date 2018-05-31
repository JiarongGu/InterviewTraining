import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Icon, LinkButton, VideoPlayer } from '../../components/common';
import { BackNavigation, TrainingSectionClose } from '../../components/layout';
import { TrainingRecordingRetake } from './TrainingRecordingComponents';

import styles from './TrainingRecording.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

import { RecordingService, Recording, FilePaths } from '../../services';

type Props = {
  history: any,
  match: { params: { index: string, id: string, mode: string } },
  questions: []
};

type State = {
  playing: boolean,
  time: string,
  recording: Recording,
  recordingService: RecordingService
};

class TrainingRecordingComponent extends Component<Props, State> {
  constructor(props) {
    super(props);

    const recordingService = new RecordingService();
    const recording = recordingService.getById(this.props.match.params.id);

    this.state = {
      playing: false,
      time: '0:00',
      recording: recording,
      recordingService: recordingService
    };

    this.videoRef = React.createRef();
    this.seekRef = React.createRef();

    this.onDurationMismatch = this.onDurationMismatch.bind(this);
  }

  onDurationMismatch(duration) {
    this.state.recording.duration = duration;
    this.state.recordingService.update(this.state.recording);
    return duration;
  }

  render() {
    const {
      history,
      questions,
      match: {
        params: { index, id, mode }
      }
    } = this.props;
    const retakeIndex = parseInt(index);
    const nextIndex =
      retakeIndex + 1 >= questions.length ? undefined : retakeIndex + 1;
    const { recording } = this.state;

    return (
      <div className={styles.layout}>
        <BackNavigation goBack={() => { history.push(`/training/question/${retakeIndex}/recording`); }} />
        <TrainingSectionClose />
        <div className={styles['back-button-background']} />
        <div className={styles['close-button-background']} />

        <VideoPlayer
          src={FilePaths.resolve(recording.filePath)}
          type={'video/webm'}
          duration={recording.duration}
          onDurationMismatch={this.onDurationMismatch}
        />
        {mode === 'retake' && (
          <TrainingRecordingRetake
            retakeIndex={retakeIndex}
            nextIndex={nextIndex}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.question.questions || []
  };
}

export const TrainingRecording = withRouter(
  connect(mapStateToProps)(TrainingRecordingComponent)
);
