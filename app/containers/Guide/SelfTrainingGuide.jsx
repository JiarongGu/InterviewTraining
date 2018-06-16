// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Guide.scss';
import { Card, Camera, Icon, Modal } from '../../components/common';
import { BackNavigation, SectionClose } from '../../components/layout';
import mStyles from '../../materialize/sass/materialize.scss';
import classNames from 'classnames';

type Props = {
  onClose: () => void
};

type State = {
  page: number
};

export class SelfTrainingGuide extends Component<Props, State> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };
  }

  render() {
    const page = this.state.page;

    return (
      <Modal fullScreen={true}>
        <div className={styles['self-training-guide-container']}>
          <SectionClose onConfirm={this.props.onClose} />
          {page !== 6 && (
            <div className={classNames(styles['page-arrow'], styles.next)}>
              <Icon
                icon={'angle-right'}
                size={'5x'}
                onClick={() => {
                  this.setState({ page: page + 1 });
                }}
              />
            </div>
          )}
          {page !== 1 && (
            <div className={classNames(styles['page-arrow'], styles.previous)}>
              <Icon
                icon={'angle-left'}
                size={'5x'}
                onClick={() => {
                  this.setState({ page: page - 1 });
                }}
              />
            </div>
          )}
          <div className={styles['guide-img-container']}>
            <div>
              <img
                className={styles['guide-img']}
                src={`./dist/guide/00${page}.png`}
              />
              <div className={styles['dot-container']}>
                <Icon
                  className={classNames({ [styles.selected]: page === 1 })}
                  icon={'circle'}
                />
                <Icon
                  className={classNames({ [styles.selected]: page === 2 })}
                  icon={'circle'}
                />
                <Icon
                  className={classNames({ [styles.selected]: page === 3 })}
                  icon={'circle'}
                />
                <Icon
                  className={classNames({ [styles.selected]: page === 4 })}
                  icon={'circle'}
                />
                <Icon
                  className={classNames({ [styles.selected]: page === 5 })}
                  icon={'circle'}
                />
                <Icon
                  className={classNames({ [styles.selected]: page === 6 })}
                  icon={'circle'}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
