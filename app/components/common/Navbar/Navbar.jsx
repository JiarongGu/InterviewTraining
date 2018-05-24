import * as React from 'react';
import styles from './Navbar.scss';
import mtStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  children: React.Node
};

export class Navbar extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <nav>
        <div className={mtStyles['nav-wrapper']}>
          <a href='#' className={mtStyles['brand-logo']}>Logo</a>
          <ul className={classNames(mtStyles['right'], mtStyles['hide-on-med-and-down'])}>
            <li><a href='sass.html'>Sass</a></li>
            <li><a href='badges.html'>Components</a></li>
            <li><a href='collapsible.html'>JavaScript</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
