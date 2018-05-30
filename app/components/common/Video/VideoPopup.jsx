// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Modal, VideoPlayer } from '../../../components/common';
import { SectionClose } from '../../../components/layout';
import { Recording, FilePaths } from '../../../services';

import styles from './VideoPopup.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  src: string,
  duration: number
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
    const { src, duration } = this.props;
    console.log(duration);
    return (
      <Modal>
        <div className={styles.container}>
          <VideoPlayer
            src={src}
            duration={duration}
          />
        </div>
      </Modal>
    );
  }
}
