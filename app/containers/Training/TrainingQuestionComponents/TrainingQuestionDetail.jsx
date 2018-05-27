import React, { Component } from 'react';

import { LinkButton } from '../../../components/common';

import styles from './TrainingQuestionDetail.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  question: { id: string, question: string, takes: number, time: number },
  index: number,
  children?: React.ReactNode
};

export class TrainingQuestionDetail extends Component<Props> {
  render() {
    const {
      question: { id, question, takes, time },
      index
    } = this.props;
    return (
      <div>
        <p>
          <span>Takes: </span>
          <span>{takes || 'Unlimited'}</span>
        </p>
        <p>
          <span>Time Limit: </span>
          <span>
            {time
              ? `${time} ${time === 1 ? 'minute' : 'minutes'}`
              : 'Unlimited'}
          </span>
        </p>
        <div className={styles.control}>
          <LinkButton
            className={classNames(mStyles['btn-large'])}
            to={`/training/question/${index}/recording`}
          >
            View Question
          </LinkButton>
          {this.props.children}
        </div>
      </div>
    );
  }
}
