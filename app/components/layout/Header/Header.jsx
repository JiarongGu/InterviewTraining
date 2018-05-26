// @flow
import * as React from 'react';
import { NavBar, NavMenu, NavMenuItem, NavLogo, Icon } from '../../common';
import { Link } from 'react-router-dom';
import styles from './Header.scss';

type Props = {};

export class Header extends React.Component<Props> {
    props: Props;

    render() {
        return (
            <NavBar className={styles.container}>
                <Icon icon={'bars'} size={'2x'}/>
                <NavLogo href={'/'} className={styles['brand-logo']}>
                    Interview Training
                </NavLogo>

                <NavMenu>
                    <NavMenuItem>
                        <Icon icon={'user-circle'} size={'2x'}/>
                    </NavMenuItem>
                    <NavMenuItem>
                        <span className={styles.item}>Alice</span>
                    </NavMenuItem>
                    <NavMenuItem>
                        <Icon icon={'ellipsis-v'} size={'lg'}/>
                    </NavMenuItem>
                </NavMenu>
            </NavBar>
        );
    }
}
