// @flow
import * as React from 'react';
import { Navbar } from '../components/common';
import styles from './App.scss';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container}>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
