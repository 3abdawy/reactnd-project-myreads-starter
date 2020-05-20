import React from "react";
// import * as BooksAPI from './BooksAPI'
import { Route } from "react-router-dom";
import "./App.css";
import Search from "./Search";
import Main from "./Main";

class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search} />
        <Route exact path="/" component={Main} />
      </div>
    );
  }
}

export default BooksApp;
