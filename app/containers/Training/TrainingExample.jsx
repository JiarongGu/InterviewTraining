import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { SectionClose } from '../../components/layout';

import styles from './TrainingExample.scss';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {};

type State = {
  isModalOpen: boolean
}

export class TrainingExample extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    } 

    this.openModal = this.openModal.bind(this);
  }

  openModal() {

  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles['view-link']}>
          <a onClick={this.openModal}>Watch Examples</a>
        </div>
      </div>
    );
  }
}
