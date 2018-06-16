/* eslint flowtype-errors/show-errors: 0 */
import React from "react";
import { Switch, Route } from "react-router";
import App from "./containers/App";
import { Home } from "./containers/Home";
import { Guide } from "./containers/Guide";
import { TrainingStart, TrainingQuestion, TrainingRecording } from "./containers/Training";
import CounterPage from "./containers/CounterPage";

export default () => (
  <App>
    <Switch>
      <Route path="/training/question/:index/recording/:id/:mode(retake|review)" component={TrainingRecording} />
      <Route path="/training/question/:index/:mode(detail|recording|retake)" component={TrainingQuestion} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/training/:animation" component={TrainingStart} />
      <Route path="/guide" component={Guide} />
      <Route path="/" component={Home} />
    </Switch>
  </App>
);
