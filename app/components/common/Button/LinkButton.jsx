import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';
import styles from './Button.scss';

type Props = {
    className?: any,
    children?: React.ReactNode,
    to: string
}

export class LinkButton extends Component<Props> {
    render() {
        return (
            <Link 
                className={classNames(mStyles['waves-effect'], mStyles['waves-light'], mStyles['btn'], this.props.className)}
                to={this.props.to}
            >
                {this.props.children}
            </Link>
        );
    }
}