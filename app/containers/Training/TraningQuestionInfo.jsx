import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Card,
  Camera,
  Icon,
  LinkButton,
  Button
} from '../../components/common';
import { BackNavigation } from '../../components/layout';

import styles from './TrainingQuestion.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';
import question from '../../reducers/question';

type Props = {
  match: { params: { index: string } },
  questions: []
};

export class TraningQuestionInfo extends Component<Props> {
  render() {
    return <div className={styles.layout} />;
  }
}
