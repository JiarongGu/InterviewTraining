// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { Card, Camera } from './common';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Camera savedDir={"./data/recordings"} />
          <Card />
          <h2>Home</h2>
          <i className={"fab fa-amazon-pay"}></i>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
