// @flow
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { SectionClose } from './SectionClose';

import classNames from 'classnames';

type Props = {
  history: { goBack: () => void },
  className?: string,
  to?: string
};

type State = {
  isModalOpen: boolean
};

export class TrainingSectionCloseComponent extends React.Component<
  Props,
  State
> {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  onConfirm() {
    this.props.history.push(this.props.to);
  }

  render() {
    return (
      <SectionClose
        message={{
          title: 'Quit Self Traning',
          body:
            'Are you sure you want to quit the Video Interview Self Training?',
          confirm: 'Yes, I want',
          cancel: "No, I don't"
        }}
        onConfirm={() => {
          this.props.history.push('/');
        }}
      />
    );
  }
}

export const TrainingSectionClose = withRouter(TrainingSectionCloseComponent);
