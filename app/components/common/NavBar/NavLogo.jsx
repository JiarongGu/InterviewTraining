import * as React from 'react';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
    children?: React.Node,
    href?: string,
    className?: any
};

export class NavLogo extends React.Component<Props> {
    props: Props;

    render() {
        return (
            <Link
                to={this.props.href}
                className={this.props.className || mStyles['brand-logo']}
            >
                {this.props.children}
            </Link>
        );
    }
}
