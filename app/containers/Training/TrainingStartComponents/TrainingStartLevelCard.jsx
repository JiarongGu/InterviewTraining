import React, { Component } from 'react';

import { Icon, LinkButton, Modal } from '../../../components/common';

import styles from './TrainingStartLevelCard.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  title: string,
  color: 'green' | 'orange' | 'blue',
  questionAmount: number,
  difficulty: string,
  onClick?: () => void,
  selected?: boolean
};

type State = {
  hover: boolean
};

export class TrainingStartLevelCard extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  render() {
    const { title, questionAmount, difficulty, color, selected, onClick } = this.props;
    return (
      <div
        className={styles.container}
        onMouseEnter={() => {
          this.setState({ hover: true });
        }}
        onMouseLeave={() => {
          this.setState({ hover: false });
        }}
        onClick={onClick}
      >
        <div className={classNames(styles.title, styles[color])}>{title}</div>
        <div className={styles.detail}>
          <div>
            <span>Questions:</span>
            <span>{questionAmount}</span>
          </div>
          <div>
            <span>Difficulty:</span>
            <span>{difficulty}</span>
          </div>
        </div>
        <div className={styles.select}>
          <div
            className={classNames(
              this.state.hover
                ? styles['select-hover']
                : styles['select-normal'],
              selected ? styles['selected-icon'] : styles['unselected-icon']
            )}
          >
            <Icon
              className={styles['select-icon']}
              icon={'check'}
              style={'Solid'}
              size={'3x'}
            />
          </div>
        </div>
      </div>
    );
  }
}
