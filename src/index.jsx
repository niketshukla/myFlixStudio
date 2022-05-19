import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducer/reducer';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

const myFlixStore = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixStudio extends React.Component {
  render() {
    return (
      <Provider store={myFlixStore}>
        <MainView />
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixStudio), container);
