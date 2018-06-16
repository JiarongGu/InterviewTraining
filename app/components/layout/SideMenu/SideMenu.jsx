// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './SideMenu.scss';
import { Icon } from '../../common';

type Props = {
  onMenuClick?: () => void
};

type State = {
  sideMenuOpen: boolean
};

export class SideMenu extends React.Component<Props, State> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      sideMenuOpen: false
    };
  }

  render() {
    const { onMenuClick } = this.props;

    return (
      <div className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <Link to={'/'} onClick={onMenuClick}>
              <Icon icon={'home'} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to={'/'} onClick={onMenuClick}>
              <Icon icon={'lightbulb'} />
              <span>Tips</span>
            </Link>
          </li>
          <li>
            <Link to={'/training/true'} onClick={onMenuClick}>
              <Icon icon={'video'} />
              <span>Self Training</span>
            </Link>
          </li>
          <li>
            <Link to={'/'} onClick={onMenuClick}>
              <Icon icon={'calendar-alt'} />
              <span>Book Interview</span>
            </Link>
          </li>
          <li>
            <Link to={'/'} onClick={onMenuClick}>
              <Icon icon={'cog'} />
              <span>General Setting</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
