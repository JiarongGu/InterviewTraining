// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Icon } from '../../../components/common';
import { SectionClose } from '../../../components/layout';

import { Recording, FilePaths, RecordingService } from '../../../services';

import styles from './TrainingGalleryVideoHoverOverLay.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  parentEntered?: boolean,
  onMouseLeave?: () => void,
  onMouseEnter?: () => void,
  onPlayClick?: () => void,
};

type State = {
  isVideoHover: boolean
}

export class TrainingGalleryVideoHoverOverLay extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isVideoHover: false
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseLeave() {
    this.setState({ isVideoHover: false });
    if (this.props.onMouseLeave) this.props.onMouseLeave();
  }

  onMouseEnter() {
    this.setState({ isVideoHover: true });
    if (this.props.onMouseEnter) this.props.onMouseEnter();
  }

  render() {
    const { parentEntered } = this.props;
    const entered = parentEntered == undefined || parentEntered;
    return (
      <div>
        {(entered && this.state.isVideoHover) && (
          <div
            className={styles['video-control']}
            onMouseLeave={this.onMouseLeave}
          >
            <div className={styles.alignment}>
              <Icon
                icon={'play-circle'}
                style={'Regular'}
                size={'5x'}
                className={styles['play-btn']}
                onClick={this.props.onPlayClick}
              />
            </div>
          </div>)}
        <div
          className={styles['video-hover']}
          onMouseEnter={this.onMouseEnter}
        />
      </div>
    );
  }
}
