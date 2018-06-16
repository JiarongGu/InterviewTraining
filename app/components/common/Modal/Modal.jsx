import * as React from 'react';

import classNames from 'classnames';
import styles from './Modal.scss';
import mStyles from '../../../materialize/sass/materialize.scss';

import { ModalOverLay } from './ModalOverLay';
import { ModalFullScreen } from './ModalFullScreen';

type Props = {
  children: React.ReactNode,
  onClick?: event => void,
  fullScreen?: boolean
};

export class Modal extends React.Component<Props> {
  props: Props;

  render() {
    const { fullScreen } = this.props;
    return (
      <ModalOverLay>
        <div className={styles.container} onClick={this.props.onClick}>
          <div className={styles.alignment}>
            {fullScreen && (
              <ModalFullScreen> {this.props.children} </ModalFullScreen>
            )}
            {!fullScreen && this.props.children}
          </div>
        </div>
      </ModalOverLay>
    );
  }
}
