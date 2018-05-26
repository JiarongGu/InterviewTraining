import React, { Component } from 'react';

import classNames from 'classnames';
import mStyles from '../../../materialize/sass/materialize.scss';
import styles from './CountDown.scss';
import { Timer } from '../../../utils';

type Props = {
  time: number,
  interval: number,
  complete?: () => void
};

type State = {
  timer: Timer,
  count: number
};

export class CountDown extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      timer: {}
    };

    this.countDown = this.countDown.bind(this);
  }

  countDown() {
    const nextCount = this.props.time - this.state.timer.ticks;
    this.setState({ count: nextCount }, () => {
      if(this.state.count <= 0)
        this.state.timer.stop();
        if(this.props.complete) complete();
    });
  }

  componentDidMount() {
    const { time, interval } = this.props;
    const timer = new Timer(this.countDown, interval);
    
    this.setState({ timer: timer, count: time }, () => {
      this.state.timer.start();
    });
  }

  componentWillUnmount() {
    this.state.timer.stop();
  }

  render() {
    return (
      <div className={styles.container}>
        Timer {this.state.count}
      </div>
    );
  }
}
