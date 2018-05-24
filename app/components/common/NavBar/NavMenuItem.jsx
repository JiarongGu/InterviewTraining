import * as React from 'react';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
    children: React.Node
};

export class NavMenuItem extends React.Component<Props> {
    props: Props;

    render() {
        return (
            <li>
                <a>
                    {this.props.children}
                </a>
            </li>
        );
    }
}
