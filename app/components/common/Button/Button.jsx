import React, { Component } from 'react';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';
import styles from './Button.scss';

type Props = {
    className?: any,
    children?: React.ReactNode,
    onClick?: (event) => void
}

export class Button extends Component<Props> {
    render() {
        return (
            <a 
                className={classNames(mStyles['waves-effect'], mStyles['waves-light'], mStyles['btn'], this.props.className)}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </a>
        );
    }
}