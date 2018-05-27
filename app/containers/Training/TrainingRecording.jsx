import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Icon, LinkButton } from '../../components/common';
import { BackNavigation } from '../../components/layout';
import { TrainingRecordingRetake } from './TrainingRecordingComponents';

import styles from './TrainingRecording.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

import { RecordingService, Recording } from '../../services';

type Props = {
  match: { params: { index: string, id: string, mode: string } },
  questions: []
};

type State = {
  playing: boolean,
  time: string,
  recording: Recording,
  recordingService: RecordingService
};

function formatSeconds(seconds) {
  const minutesDisplay = Math.floor(seconds / 60);
  const secondsInMinute = '000000000' + Math.floor(seconds % 60);
  const secondsDisplay = secondsInMinute.substr(secondsInMinute.length - 2);

  return `${minutesDisplay}:${secondsDisplay}`;
}

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

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.seek = this.seek.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onEnded = this.onEnded.bind(this);
  }

  componentDidMount() {
    const video = this.videoRef.current;
    video.volume = 1;
  }

  play() {
    const video = this.videoRef.current;
    const seek = this.seekRef.current;

    this.setState({ playing: true }, () => {
      seek.value = video.currentTime / this.state.recording.duration * 100;
      video.play();
    });
  }

  pause() {
    const video = this.videoRef.current;
    this.setState({ playing: false }, () => {
      video.pause();
    });
  }

  seek(event) {
    const video = this.videoRef.current;
    const seek = parseFloat(event.target.value);
    const time = this.state.recording.duration * (seek / 100);
    video.currentTime = time;
    this.setState({ time: formatSeconds(time) });
  }

  onTimeUpdate(event) {
    const video = event.target;
    const seek = this.seekRef.current;

    this.setState({ time: formatSeconds(video.currentTime) }, () => {
      seek.value = video.currentTime / this.state.recording.duration * 100;
    });

    if (
      video.duration &&
      video.duration != Infinity &&
      video.duration != this.state.recording.duration
    ) {
      console.log('Recording duration mismatch.');
      this.state.recording.duration = video.duration;
      this.state.recordingService.update(this.state.recording);
    }
  }

  onEnded(event) {
    this.setState({ playing: false });
  }

  render() {
    const {
      questions,
      match: {
        params: { index, id, mode }
      }
    } = this.props;
    const retakeIndex = parseInt(index);
    const nextIndex =
      retakeIndex + 1 >= questions.length ? undefined : retakeIndex + 1;

    return (
      <div className={styles.layout}>
        <BackNavigation />
        <div className={styles['back-button-background']} />

        <video
          ref={this.videoRef}
          className={styles.video}
          src={this.state.recording.filePath}
          type={'video/webm'}
          onTimeUpdate={this.onTimeUpdate}
          onEnded={this.onEnded}
        />

        <div className={styles.controls}>
          {!this.state.playing && (
            <div className={styles.play} onClick={this.play}>
              <Icon icon={'play-circle'} size={'3x'} />
            </div>
          )}
          {this.state.playing && (
            <div className={styles.pause} onClick={this.pause}>
              <Icon icon={'pause-circle'} size={'3x'} />
            </div>
          )}
          <div className={styles.time}>
            <span>{this.state.time}</span>
          </div>
          <div className={styles['seek-bar']}>
            <input
              ref={this.seekRef}
              type={'range'}
              min={0}
              max={100}
              onChange={this.seek}
              defaultValue={0}
            />
          </div>
        </div>
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
