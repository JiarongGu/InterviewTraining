import React, { Component } from 'react';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';
import styles from './Card.scss';
type Props = {
    className?: any,
    children?: React.ReactNode,
    size: string
}

export class Card extends Component<Props> {
    render() {
        return (
            <div className={classNames(mStyles['col'], mStyles[this.props.size], this.props.className)}>
                <div className={classNames(mStyles['card-panel'], mStyles['white'], mStyles['lighten-5'], styles.content)}>
                    <span className={classNames(mStyles['grey-text'], mStyles['text-darken-3'])}>
                        {this.props.children}
                    </span>
                </div>
            </div>
        );
    }
}