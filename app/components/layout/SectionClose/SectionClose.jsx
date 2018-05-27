import * as React from 'react';
import { Icon, Modal } from '../../common';

import styles from './SectionClose.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';
import { fail } from 'assert';

type Props = {
  className?: string,
  message?: { title: string, body: string, confirm: string, cancel: string },
  onConfirm?: () => void,
  onCancel?: () => void,
};

type State = {
  isModalOpen: boolean
};

export class SectionClose extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  onConfirm() {
    if(this.props.onConfirm) this.props.onConfirm();
  }

  onCancel() {
    this.setState({ isModalOpen: false });
    if(this.props.onCancel) this.props.onCancel();
  }

  render() {
    const { message, className } = this.props;

    return (
      <div className={classNames(styles.container, className)}>
        {this.state.isModalOpen && (
          <Modal>
            <div className={styles['modal-content']}>
              <div className={styles['modal-title']}>{message && message.title}</div>
              <div className={styles['modal-message']}>{message && message.body}</div>
              <div className={styles['modal-controls']}>
                <a onClick={this.onCancel}>{message && message.cancel}</a>
                <a onClick={this.onConfirm}>{message && message.confirm}</a>
              </div>
            </div>
          </Modal>
        )}
        <a onClick={this.openModal}>
          <Icon
            icon={'times'}
            size={'3x'}
            className={classNames(
              mStyles['grey-text'],
              mStyles['text-darken-4'],
              styles['close-button']
            )}
          />
        </a>
      </div>
    );
  }
}
