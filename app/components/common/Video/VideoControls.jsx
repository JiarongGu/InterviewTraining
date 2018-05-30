// @flow
import React, { Component } from 'react';

import { Icon } from '../Icon';

import styles from './VideoControls.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  time: string,
  onStart: () => void,
  onPasue: () => void,
  onSeek: () => void
};

type State = {
  playing: boolean
};

export class VideoControls extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      playing: false
    };

    this.onStart = this.onStart.bind(this);
    this.onPasue = this.onPasue.bind(this);
    this.onSeek = this.onSeek.bind(this);

    this.seekRef = React.createRef();
  }

  onStart() {
    if (this.props.onStart) this.props.onStart();
    this.setState({playing: true});
  }

  onPasue() {
    if (this.props.onPasue) this.props.onPasue();
    this.setState({playing: false});
  }

  onSeek() {
    if (this.props.onSeek) this.props.onSeek();
  }

  setSeek(seek: number) {
    this.seekRef.current.value = seek;
  }

  setPlay(play: boolean) {
    this.setState({playing: play});
  }

  render() {
    const { time } = this.props;
    const { playing } = this.state;

    return (
      <div className={styles.controls}>
        {playing ? (
          <div className={styles.pause} onClick={this.onPasue}>
            <Icon icon={'pause-circle'} size={'3x'} />
          </div>
        ) : (
          <div className={styles.play} onClick={this.onStart}>
            <Icon icon={'play-circle'} size={'3x'} />
          </div>
        )}
        <div className={styles.time}>
          <span>{time}</span>
        </div>
        <div className={styles['seek-bar']}>
          <input
            ref={this.seekRef}
            type={'range'}
            min={0}
            max={100}
            onChange={this.onSeek}
            defaultValue={0}
          />
        </div>
      </div>
    );
  }
}
