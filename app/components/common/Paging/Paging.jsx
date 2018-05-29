import React, { Component } from 'react';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';
import styles from './Card.scss';
type Props = {
    className?: any,
    children?: React.ReactNode,
    size: string
}

export class Paging extends Component<Props> {
    render() {
        return (
            <div className={classNames(mStyles['col'], mStyles[this.props.size], this.props.className)} style={this.props.styles}>
                <div className={classNames(mStyles['card-panel'], mStyles['white'], mStyles['lighten-5'], styles.content)}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}