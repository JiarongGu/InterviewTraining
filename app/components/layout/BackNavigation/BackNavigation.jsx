// @flow
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { Icon } from '../../common';

import styles from './BackNavigation.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  history: { goBack: () => void }
};

export class BackNavigationComponent extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container}>
        <a
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          <Icon icon={'chevron-left'} size={'3x'} className={classNames(mStyles['grey-text'], mStyles['text-darken-4'])} />
        </a>
      </div>
    );
  }
}

export const BackNavigation = withRouter(BackNavigationComponent);
