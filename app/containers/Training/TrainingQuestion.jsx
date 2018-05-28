import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Icon, LinkButton } from '../../components/common';
import {
  TrainingQuestionRecording,
  TrainingQuestionDetail
} from './TrainingQuestionComponents';
import {
  BackNavigationToTraining,
  TrainingSectionClose
} from '../../components/layout';
import { TrainingExample } from './TrainingExample';
import { TrainingGallery } from './TrainingGallery';
import { Question } from '../../services';

import styles from './TrainingQuestion.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';
import question from '../../reducers/question';

type Props = {
  match: { params: { index: string } },
  questions: Question[]
};

class TrainingQuestionComponent extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }

  render() {
    const {
      match: {
        params: { index, mode }
      },
      questions
    } = this.props;
    const questionIndex = parseInt(index);
    const question = questions && questions[questionIndex];

    return (
      <div className={styles.layout}>
        <BackNavigationToTraining />
        <TrainingSectionClose />
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>Question {questionIndex + 1}</h1>
          </div>
          {question && (
            <div className={styles.content}>
              <div className={styles.alignment}>
                {mode === 'detail' && (
                  <TrainingQuestionDetail
                    question={question}
                    index={questionIndex}
                  />
                )}
                {mode === 'recording' && (
                  <TrainingQuestionRecording
                    question={question}
                    index={questionIndex}
                  >
                    <TrainingExample question={question} />
                    <TrainingGallery question={question} />
                  </TrainingQuestionRecording>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.question.questions || []
  };
}

export const TrainingQuestion = withRouter(
  connect(mapStateToProps)(TrainingQuestionComponent)
);
