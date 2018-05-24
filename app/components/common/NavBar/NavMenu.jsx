import * as React from 'react';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  children: React.Node
};

export class NavMenu extends React.Component<Props> {
  props: Props;

  render() {
    return (
        <ul className={classNames(mStyles['right'], mStyles['hide-on-med-and-down'])}>
            {this.props.children}
        </ul>
    );
  }
}
