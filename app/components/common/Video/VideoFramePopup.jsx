// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Modal, Icon } from '../../../components/common';
import { SectionClose } from '../../../components/layout';

import styles from './VideoFramePopup.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  src: string,
  onClose?: () => void
};

export class VideoFramePopup extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      videoHover: false
    };
  }

  render() {
    const { src, duration, type, onClose } = this.props;

    return (
      <Modal>
        <div className={styles.container}>
          <iframe
            className={styles.video}
            src={src}
            frameBorder="0"
            allow={'autoplay; encrypted-media'}
          />
          <div className={styles['close-button-container']}>
            <div>
              <Icon
                icon={'times'}
                size={'3x'}
                className={classNames(
                  mStyles['grey-text'],
                  mStyles['text-darken-4'],
                  styles['close-button']
                )}
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
