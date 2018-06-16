// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Guide.scss';
import { Card, Camera, Icon } from '../../components/common';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {};

export class Guide extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.alignment}>
          <div className={classNames(styles.content, styles.title)}>
            <h1>User Guide</h1>
            <p>
              This application is designed for people who want to prepare
              themselve for the real job interview.
            </p>
          </div>
          <div
            className={classNames(
              mStyles['row'],
              styles.content,
              styles['card-row']
            )}
          >
            <Card className={styles.card} size={'m4'}>
              <Link to={'/'} className={styles['card-content']}>
                <div className={styles['card-title']}>
                  Guide for Traning Tips
                </div>
                <Icon icon={'lightbulb'} style={'Regular'} size={'7x'} />
                <div className={styles['card-detail']}>
                  This will provide different kind of tips to boots
                  the user's knowlegde of job interview
                </div>
              </Link>
            </Card>
            <Card className={styles.card} size={'m4'}>
              <Link to={'/training/true'} className={styles['card-content']}>
                <div className={styles['card-title']}>
                  Guide for Self Training
                </div>
                <Icon icon={'video'} style={'Solid'} size={'7x'} />
                <div className={styles['card-detail']}>
                  This section will provide the video interview self traning chance to improve the preformance.
                </div>
              </Link>
            </Card>
            <Card className={styles.card} size={'m4'}>
              <Link to={'/'} className={styles['card-content']}>
                <div className={styles['card-title']}>
                  Guide for Book Interview
                </div>
                <Icon icon={'calendar-alt'} style={'Regular'} size={'7x'} />
                <div className={styles['card-detail']}>
                  This section will provide face to face interview session to guide by the experts and feel how the real job interview will be.
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
