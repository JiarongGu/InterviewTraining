/* eslint flowtype-errors/show-errors: 0 */
import React from "react";
import { Switch, Route } from "react-router";
import App from "./containers/App";
import { Home } from "./containers/Home";
import { TrainingStart, TrainingQuestion, TrainingRecording } from "./containers/Training";
import CounterPage from "./containers/CounterPage";

export default () => (
  <App>
    <Switch>
      <Route path="/training/question/:index/recording/:id/:mode(retake|review)" component={TrainingRecording} />
      <Route path="/training/question/:index/:mode(detail|recording)" component={TrainingQuestion} />
      <Route path="/training/start" component={TrainingStart} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/training" component={TrainingStart} />
      <Route path="/" component={Home} />
    </Switch>
  </App>
);
