import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { CountDown, Modal} from '../../components/common';

import styles from './TrainingQuestionCountDown.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  onComplete?: () => {}
};

export class TrainingQuestionCountDown extends Component<Props> {
  render() {
    return (
      <Modal>
          <div className={styles.container}>
            <div className={styles.alignment}>
              <div>
                <CountDown
                  time={3}
                  interval={1000}
                  onComplete={this.props.onComplete}
                  className={styles.countDown}
                />
              </div>
            </div>
          </div>
      </Modal>
    );
  }
}
