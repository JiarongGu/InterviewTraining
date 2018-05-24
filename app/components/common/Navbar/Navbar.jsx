import * as React from 'react';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  children: React.Node,
  className: any
};

export class NavBar extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <nav className={this.props.className}>
        <div className={mStyles['nav-wrapper']}>
          {this.props.children}
        </div>
      </nav>
    );
  }
}
