import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Card, Camera, Icon, LinkButton, Button } from "../../components/common";

import styles from "./TrainingQuestion.scss";
import mStyles from "../../materialize/sass/materialize.scss";
import classNames from "classnames";
import question from "../../reducers/question";

type Props = {};

class TrainingQuestionComponent extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }

  render() {
    // console.log("Training Question:: ", this.props);
    // console.log(require('electron').remote);
    const { match: { params: { index } }, questions } = this.props;
    const questionIndex = parseInt(index);
    const question = questions && questions[questionIndex];

    return (
      <div className={styles.container}>
        <div className={styles.alignment}>
          {question && (
            <div>
              <h1>Question {questionIndex + 1}</h1>
              <h2>{question.question}</h2>
            </div>
          )}
          <Button onClick={() => { this.props.history.goBack(); }}>
            Back
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.question.questions || []
  };
}

export const TrainingQuestion = withRouter(
  connect(mapStateToProps)(TrainingQuestionComponent)
);
