// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './TrainingStart.scss';
import { Card, Camera, Icon, LinkButton } from '../../components/common';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';
import { environment } from '../../services';

type Props = {};

export class TrainingStart extends Component<Props> {
    props: Props;

    render() {
        console.log("environment read:: ", environment.getApp());

        return (
            <div className={styles.container} data-tid="container">
                <div className={styles.alignment}>
                    <div>
                        <h1>Vedio Interview Self Training</h1>
                    </div>
                    <div className={styles['button-container']}>
                        <LinkButton 
                            className={classNames(mStyles['btn-large'], styles.button)}
                            to={'/training/question/1/0'}
                        >
                            <h5>Start</h5>
                        </LinkButton>
                    </div>
                </div>
            </div>
        );
    }
}
