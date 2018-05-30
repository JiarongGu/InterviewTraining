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
                {/* <Camera savedDir={"./data/recordings"} /> */}
                <div className={styles.alignment}>
                    <div className={classNames(mStyles['row'], styles.content)}>
                        <Card className={styles.card} size={'m4'}>
                            <Link to={'/'} className={styles['card-content']}>
                                <Icon icon={'lightbulb'} style={'Regular'} size={'7x'} />
                                <h4 className={styles['card-title']}>Tips</h4>
                            </Link>
                        </Card>
                        <Card className={styles.card} size={'m4'}>
                            <Link to={'/training/true'} className={styles['card-content']}>
                                <Icon icon={'video'} style={'Solid'} size={'7x'} />
                                <h4 className={styles['card-title']}>Self Training</h4>
                            </Link>
                        </Card>
                        <Card className={styles.card} size={'m4'}>
                            <Link to={'/'} className={styles['card-content']}>
                                <Icon icon={'calendar-alt'} style={'Regular'} size={'7x'} />
                                <h4 className={styles['card-title']}>Book Interview</h4>
                            </Link>
                        </Card>
                    </div>
                </div>
                {/* <h2>Home</h2>
                    <Icon icon={'bars'} />
                    <Link to="/counter">to Counter</Link> */}
            </div>
        );
    }
}
