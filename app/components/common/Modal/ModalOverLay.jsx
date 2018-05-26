import * as React from 'react';

import classNames from 'classnames';
import styles from './Modal.scss';
import mStyles from '../../../materialize/sass/materialize.scss';

type Props = {
  children: React.ReactNode
};

export class ModalOverLay extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.overlay}>
        {this.props.children}
      </div>
    );
  }
}
