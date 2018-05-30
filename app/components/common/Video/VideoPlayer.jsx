// @flow
import React, { Component } from 'react';

import { VideoControls } from './VideoControls';

import styles from './VideoPlayer.scss';
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
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onEnded = this.onEnded.bind(this);

    this.controlRef = React.createRef();
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.videoRef.current.volume = 1;
  }

  onStart() {
    const video = this.videoRef.current;
    this.controlRef.current.setSeek(video.currentTime / this.state.duration * 100);
    video.play();
  }

  onPasue() {
    this.videoRef.current.pause();
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
    const control = this.controlRef.current;

    this.setState({ time: formatSeconds(video.currentTime) }, () => {
      control.setSeek(video.currentTime / this.state.duration * 100);
    });

    if (
      video.duration &&
      video.duration != Infinity &&
      video.duration != this.state.duration
    ) {
      console.log('Recording duration mismatch.');
      if(this.props.onDurationMismatch){
        const duration = this.props.onDurationMismatch(video.duration);
        this.setState({ duration  });
      }
    }
  }

  onEnded(event) {
    this.controlRef.current.setPlay(false);
  }

  render() {
    const { src, type } = this.props;

    return (
      <div>
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
            ref={this.controlRef}
            onPasue={this.onPasue}
            onStart={this.onStart}
            onSeek={this.onSeek}
          />
        </div>
      </div>
    );
  }
}
