import * as React from 'react';

import styles from './Modal.scss';

type Props = {
    children: React.ReactNode,
};

export class ModalFullScreen extends React.Component<Props> {
    props: Props;

    render() {
        return (
            <div className={styles['modal-full-screen']}>
                {this.props.children}
            </div>
        );
    }
}
