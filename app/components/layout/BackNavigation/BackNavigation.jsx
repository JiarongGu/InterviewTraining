import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { Icon } from '../../common';

import styles from './BackNavigation.scss';
import mStyles from '../../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  history: { goBack: () => void },
  className?: string,
  goBack?: () => void
};

class BackNavigationComponent extends React.Component<Props> {
  render() {
    return (
      <div className={classNames(styles.container, this.props.className)}>
        <a
          onClick={() => {
            if (this.props.goBack) {
              this.props.goBack();
            } else {
              this.props.history.goBack();
            }
          }}
        >
          <Icon
            icon={'chevron-left'}
            size={'3x'}
            className={classNames(
              mStyles['grey-text'],
              mStyles['text-darken-4'],
              styles['back-button']
            )}
          />
        </a>
      </div>
    );
  }
}

export const BackNavigation = withRouter(BackNavigationComponent);
