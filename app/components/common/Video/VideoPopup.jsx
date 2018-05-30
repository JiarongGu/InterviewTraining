// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Modal, Card, Icon } from '../../../components/common';
import { SectionClose } from '../../../components/layout';
import { Recording, FilePaths } from '../../../services';

import styles from './VideoPopup.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  src: string,
  onClose?: () => void
};

export class VideoPopup extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      videoHover: false
    };
  }

  render() {
    const { src } = this.props;
    return (
      <Modal>
        <div className={styles.container}>
          <video
            className={styles.video}
            src={src}
            autoPlay
          />
        </div>
      </Modal>
    );
  }
}
