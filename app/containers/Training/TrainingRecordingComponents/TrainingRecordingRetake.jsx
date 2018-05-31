import React, { Component } from 'react';

import { Icon, LinkButton, Modal } from '../../../components/common';

import styles from './TrainingRecordingRetake.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  retakeIndex: number,
  nextIndex?: number
};

type State = {
  saveConfirmed: boolean
};

export class TrainingRecordingRetake extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      saveConfirmed: false
    };
  }

  render() {
    const { retakeIndex, nextIndex } = this.props;
    return (
      <div>
        {this.state.saveConfirmed || (
          <Modal onClick={() => {this.setState({ saveConfirmed: true })}}>
            <div className={styles['modal-content']}>
              <Icon icon={'check-square'} size={'3x'} />
              <span>This take has been successfully saved!</span>
            </div>
          </Modal>
        )}
        <div className={styles.navigation}>
          <LinkButton to={`/training/question/${retakeIndex}/retake`}>
            Retake
          </LinkButton>
          {nextIndex != undefined && (
            <LinkButton to={`/training/question/${nextIndex}/detail`}>
              Next
            </LinkButton>
          )}
          {nextIndex == undefined && (
            <LinkButton to={`/training/question/start`}>Finished</LinkButton>
          )}
        </div>
      </div>
    );
  }
}
