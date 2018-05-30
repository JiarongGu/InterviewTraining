// @flow
import React, { Component } from 'react';

import { VideoControls } from './VideoControls';

import styles from './VideoControls.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

function formatSeconds(seconds) {
  const minutesDisplay = Math.floor(seconds / 60);
  const secondsInMinute = '000000000' + Math.floor(seconds % 60);
  const secondsDisplay = secondsInMinute.substr(secondsInMinute.length - 2);

  return `${minutesDisplay}:${secondsDisplay}`;
}

type Props = {
  src: string,
  type: string,
  onTimeUpdate?: () => void,
  onEnded?: () => void,
  onDurationMismatch? : (duration) => void,
  duration: number
};

type State = {
  duration: number,
  time: string
}

export class VideoPlayer extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      duration: this.props.duration,
      time: '0:00'
    };

    this.onStart = this.onStart.bind(this);
    this.onPasue = this.onPasue.bind(this);
    this.onSeek = this.onSeek.bind(this);
    this.onTimeUpdate = this.onPasue.bind(this);
    this.onEnded = this.onSeek.bind(this);

    this.controlRef = React.createRef();
    this.videoRef = React.createRef();
  }

  onStart() {
    const video = this.videoRef.current;
    const control = this.controlRef.current;

    this.setState({ playing: true }, () => {
      control.setSeek(video.currentTime / this.state.recording.duration * 100);
      video.play();
    });
  }

  onPasue() {
    const video = this.videoRef.current;

    this.setState({ playing: false }, () => {
      video.pause();
    });
  }

  onSeek(event) {
    const video = this.videoRef.current;
    const seek = parseFloat(event.target.value);

    const time = this.state.duration * (seek / 100);

    video.currentTime = time;
    this.setState({ time: formatSeconds(time) });
  }

  onTimeUpdate(event) {
    const video = event.target;
    const seek = this.seekRef.current;

    this.setState({ time: formatSeconds(video.currentTime) }, () => {
      seek.setSeek(video.currentTime / this.state.recording.duration * 100);
    });

    if (
      video.duration &&
      video.duration != Infinity &&
      video.duration != this.state.duration
    ) {
      console.log('Recording duration mismatch.');
      if(this.props.onDurationMismatch)
        this.props.onDurationMismatch(video.duration);
    }
  }

  onEnded(event) {
    const seek = this.seekRef.current.setPlay(false);
  }

  render() {
    const { src, type } = this.props;

    return (
      <div className={styles.container}>
        <video
          ref={this.videoRef}
          className={styles.video}
          src={src}
          type={type}
          onTimeUpdate={this.onTimeUpdate}
          onEnded={this.onEnded}
        />

        <div className={styles.controls}>
          <VideoControls
            time={this.state.time}
            ref={this.seekRef}
            onPasue={this.onPasue}
            onStart={this.onStart}
            onSeek={this.onSeek}
          />
        </div>
      </div>
    );
  }
}
