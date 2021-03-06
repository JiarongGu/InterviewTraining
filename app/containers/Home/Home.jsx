// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.scss';
import { Card, Camera, Icon } from '../../components/common';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {};

export class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <Link to={'/guide'} className={styles['helper-link']}>
          <Icon size={'2x'} icon={'question-circle'} style={'Regular'} />
          <span>Need Help?</span>
        </Link>
        <div className={styles.alignment}>
          <div className={classNames(mStyles['row'], styles.content)}>
            <Card className={styles.card} size={'m4'}>
              <Link to={'/'} className={styles['card-content']}>
                <Icon icon={'lightbulb'} style={'Regular'} size={'7x'} />
                <h2 className={styles['card-title']}>Traning Tips</h2>
              </Link>
            </Card>
            <Card className={styles.card} size={'m4'}>
              <Link to={'/training/true'} className={styles['card-content']}>
                <Icon icon={'video'} style={'Solid'} size={'7x'} />
                <h2 className={styles['card-title']}>Self Training</h2>
              </Link>
            </Card>
            <Card className={styles.card} size={'m4'}>
              <Link to={'/'} className={styles['card-content']}>
                <Icon icon={'calendar-alt'} style={'Regular'} size={'7x'} />
                <h2 className={styles['card-title']}>Book Interview</h2>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
