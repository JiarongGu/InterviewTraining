import * as React from 'react';
import { Icon, Modal } from '../../common';

import styles from './MessageBox.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';
import { fail } from 'assert';

type Props = {
  className?: string,
  titleText?: string,
  bodyText?: string,
  confirmText?: string,
  cancelText?: string,
  onConfirm?: () => void,
  onCancel?: () => void,
  backdrop?: boolean,
};

export class MessageBox extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onConfirm() {
    if (this.props.onConfirm) this.props.onConfirm();
  }

  onCancel() {
    if (this.props.onCancel) this.props.onCancel();
  }

  render() {
    const { className, titleText, bodyText, confirmText, cancelText, onCancel, onConfirm, backdrop } = this.props;

    return (
      <Modal onClick={backdrop && this.onCancel}>
        <div className={classNames(styles.content, className)}>
          <div className={styles.title}>{titleText}</div>
          <div className={styles.message}>{bodyText}</div>
          <div className={styles.controls}>
            {onCancel && <a className={styles['link-btn']} onClick={this.onCancel}>{cancelText}</a>}
            {onConfirm && <a className={styles['link-btn']} onClick={this.onConfirm}>{confirmText}</a>}
          </div>
        </div>
      </Modal>
    );
  }
}
