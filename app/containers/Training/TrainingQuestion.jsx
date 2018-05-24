// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './TrainingQuestion.scss';
import { Card, Camera, Icon, LinkButton, Button } from '../../components/common';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {};

class TrainingQuestionComponent extends Component<Props> {
    props: Props;

    render() {
        console.log("Training Question:: ", this.props);
        return (
            <div className={styles.container} data-tid="container">
                <div className={styles.alignment}>
                    <div>
                        <h1>Question 1</h1>
                        <Button onClick={() => { this.props.history.goBack(); }}>Back</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export const TrainingQuestion = withRouter(TrainingQuestionComponent);