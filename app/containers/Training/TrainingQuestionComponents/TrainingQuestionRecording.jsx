import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, CountDown } from '../../../components/common';

import styles from './TrainingQuestionRecording.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

import { TrainingQuestionCamera } from './TrainingQuestionCamera';

type Props = {
  question: { id: string, question: string, takes: number, time: number },
  index: number,
  children?: React.ReactNode,
  recording?: boolean
};

type State = {
  recording: boolean
};

export class TrainingQuestionRecording extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      recording: this.props.recording || false
    };
  }

  render() {
    const { question, index, children } = this.props;

    return (
      <div>
        {this.state.recording && (
          <TrainingQuestionCamera
            question={question}
            index={index}
          />
        )}
        <h1>{question.question}</h1>
        <div className={styles.control}>
          <Button
            className={classNames(mStyles['btn-large'], styles.button)}
            onClick={() => this.setState({ recording: true })}
          >
            Start Recording
          </Button>
          {children}
        </div>
      </div>
    );
  }
}
