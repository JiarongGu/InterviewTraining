import * as React from 'react';

import classNames from 'classnames';
import styles from './Modal.scss';
import mStyles from '../../../materialize/sass/materialize.scss';

import { ModalOverLay } from './ModalOverLay';

type Props = {
    children: React.ReactNode,
    onClick?: (event) => void
};

export class Modal extends React.Component<Props> {
    props: Props;

    render() {
        return (
            <ModalOverLay>
                <div className={styles.container} onClick={this.props.onClick}>
                    <div className={styles.alignment}>
                        {this.props.children}
                    </div>
                </div>
            </ModalOverLay>
        );
    }
}
