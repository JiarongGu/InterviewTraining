// @flow
import * as React from 'react';
import { Header } from '../components/layout';
import styles from './App.scss';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.body}>{this.props.children}</div>
      </div>
    );
  }
}
