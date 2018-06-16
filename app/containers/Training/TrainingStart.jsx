// @flow
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Link, withRouter } from 'react-router-dom';
import { Card, Camera, Icon, LinkButton } from '../../components/common';
import { TrainingSectionClose } from '../../components/layout';
import { TrainingStartLevelCard } from './TrainingStartComponents';
import { SelfTrainingGuide } from '../Guide';

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
  match: object
};

type State = {
  selectedLevel: string,
  selfTraningGuideOpen: boolean
};

class TrainingStartComponent extends Component<Props, State> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      selectedLevel: 'basic'
    };
  }

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
          {this.state.selfTraningGuideOpen && (
            <SelfTrainingGuide
              onClose={() => {
                this.setState({ selfTraningGuideOpen: false });
              }}
            />
          )}
          {!loading && (
            <div className={styles.alignment}>
              <div>
                <h3>Vedio Interview Self Training</h3>
              </div>

              <div className={styles.caption}>choose traning level:</div>

              <div>
                <div
                  className={classNames(mStyles.row, styles['card-container'])}
                >
                  <div
                    className={classNames(
                      mStyles['col'],
                      mStyles.m4,
                      styles['card-col']
                    )}
                  >
                    <TrainingStartLevelCard
                      title={'Basic'}
                      color={'green'}
                      questionAmount={10}
                      difficulty={'Easy'}
                      selected={this.state.selectedLevel == 'basic'}
                      onClick={() => {
                        this.setState({ selectedLevel: 'basic' });
                      }}
                    />
                  </div>
                  <div
                    className={classNames(
                      mStyles['col'],
                      mStyles.m4,
                      styles['card-col']
                    )}
                  >
                    <TrainingStartLevelCard
                      title={'Advance'}
                      color={'orange'}
                      questionAmount={20}
                      difficulty={'Hard'}
                      selected={this.state.selectedLevel == 'advance'}
                      onClick={() => {
                        this.setState({ selectedLevel: 'advance' });
                      }}
                    />
                  </div>
                  <div
                    className={classNames(
                      mStyles['col'],
                      mStyles.m4,
                      styles['card-col']
                    )}
                  >
                    <TrainingStartLevelCard
                      title={'Custom'}
                      color={'blue'}
                      questionAmount={4}
                      difficulty={'Easy'}
                      selected={this.state.selectedLevel == 'custom'}
                      onClick={() => {
                        this.setState({ selectedLevel: 'custom' });
                      }}
                    />
                  </div>
                </div>
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
              <div className={styles['helper-link']}>
                <a
                  onClick={() => {
                    this.setState({ selfTraningGuideOpen: true });
                  }}
                >
                  First time use? Click here for guide
                </a>
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

export const TrainingStart = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TrainingStartComponent)
);
