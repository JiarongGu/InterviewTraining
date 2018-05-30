// @flow
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Link, withRouter } from 'react-router-dom';
import { Card, Camera, Icon, LinkButton } from '../../components/common';
import { TrainingSectionClose } from '../../components/layout';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as QuestionActions from '../../actions/question';

import mStyles from '../../materialize/sass/materialize.scss';
import styles from './TrainingStart.scss';
import classNames from 'classnames';
import question from '../../reducers/question';

type Props = {
  generateQuestions: () => void,
  loading: boolean,
  questions: [],
  history: object,
  match: object,
};

class TrainingStartComponent extends Component<Props> {
  props: Props;

  componentWillMount() {
    this.props.generateQuestions(5);
  }

  render() {
    const { loading, questions, match } = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionName={'training-animation'}
        transitionAppear={match.params.animation === 'true'}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className={styles.container} data-tid="container">
          <TrainingSectionClose />
          {!loading && (
            <div className={styles.alignment}>
              <div>
                <h1>Vedio Interview Self Training</h1>
              </div>
              <div className={styles['button-container']}>
                {questions.length > 0 && (
                  <LinkButton
                    className={classNames(mStyles['btn-large'], styles.button)}
                    to={'/training/question/0/detail'}
                  >
                    <h5>Start</h5>
                  </LinkButton>
                )}
              </div>
            </div>
          )}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.question.loading || false,
    questions: state.question.questions || []
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(QuestionActions, dispatch);
}

export const TrainingStart = withRouter(connect(mapStateToProps, mapDispatchToProps)(
  TrainingStartComponent
));
