import React, { Component } from 'react';

import { Icon } from '../Icon';

import classNames from 'classnames';
import mStyles from '../../../materialize/sass/materialize.scss';

import { Timer } from '../../../utils';

type Props = {
  minutes: number,
  onComplete?: () => void,
  className?: string
};

type State = {
  timer: Timer,
  count: number
};

export class CountDownTime extends Component<Props> {
  constructor(props) {
    super(props);

    this.countDown = this.countDown.bind(this);

    const timer = new Timer(this.countDown, 1000);

    this.state = {
      count: 0,
      timer: timer
    };
  }

  countDown() {
    const nextseconds = this.props.minutes * 60 - this.state.timer.ticks;

    this.setState({ seconds: nextseconds }, () => {
      if (this.state.seconds <= 0) {
        this.state.timer.stop();
        if (this.props.onComplete) this.props.onComplete();
      }
    });
  }

  start() {
    const { minutes } = this.props;

    this.setState({ seconds: minutes * 60 }, () => {
      this.state.timer.start();
    });
  }

  componentWillUnmount() {
    if(this.state.timer) this.state.timer.stop();
  }

  render() {
    const { className } = this.props;
    const { seconds } = this.state;
    const minutesDisplay = Math.floor(seconds / 60);
    const secondsInMinute = ("000000000" + (seconds % 60));
    const secondsDisplay = secondsInMinute.substr(secondsInMinute.length-2);
    
    return (
      <div className={className}>
        <Icon icon={'clock'} style={'Regular'} />
        <span>{`${minutesDisplay}:${secondsDisplay}`}</span>
      </div>
    );
  }
}
