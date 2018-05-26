import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, CountDown, Modal, Camera } from '../../components/common';

import styles from './TrainingQuestionCamera.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  close: () => {}
};

type State = {
  error: {}
};

export class TrainingQuestionCamera extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };
  }

  render() {
    // const {
    //   question: { id, question, takes, time },
    //   index
    // } = this.props;

    return (
      <Modal>
        <div className={styles.container}>
          <Camera
            height={810}
            width={1596}
            output={'./data/recordings'}
            onError={error => this.setState({ error })}
          />
          <Modal>
              {!this.state.error && <CountDown time={10} interval={1000} />}
              {this.state.error && <div>Error : {this.state.error.name}</div>}
          </Modal>
        </div>
      </Modal>
    );
  }
}
