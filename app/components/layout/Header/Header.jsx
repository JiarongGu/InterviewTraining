// @flow
import * as React from 'react';
import { NavBar, NavMenu, NavMenuItem, NavLogo, Icon } from '../../common';
import { SideMenu } from '../SideMenu';
import { Link } from 'react-router-dom';
import styles from './Header.scss';

type Props = {};

type State = {
  sideMenuOpen: boolean
};

export class Header extends React.Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      sideMenuOpen: false
    };
  }

  render() {
    return (
      <NavBar className={styles.container}>
        {this.state.sideMenuOpen && (
          <SideMenu
            onMenuClick={() => {
              this.setState({ sideMenuOpen: false });
            }}
          />
        )}
        <Icon
          icon={'bars'}
          size={'2x'}
          className={styles['side-menu-button']}
          onClick={() => {
            this.setState({ sideMenuOpen: !this.state.sideMenuOpen });
          }}
        />
        <NavLogo href={'/'} className={styles['brand-logo']}>
          Interview Training
        </NavLogo>

        <NavMenu>
          <NavMenuItem>
            <Icon icon={'user-circle'} size={'2x'} />
          </NavMenuItem>
          <NavMenuItem>
            <span className={styles.item}>Alice</span>
          </NavMenuItem>
          <NavMenuItem>
            <Icon icon={'ellipsis-v'} size={'lg'} />
          </NavMenuItem>
        </NavMenu>
      </NavBar>
    );
  }
}
