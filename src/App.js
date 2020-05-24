import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Search from "./Containers/Search";
import * as BooksApi from "./BooksAPI";
import Shelves from "./Containers/Shelves";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksApi.getAll()
      .then(res => res)
      .then(data => {
        this.setState({ books: data});
      });
  }

  changeShelf = (book, shelf) => {
    this.setState({
      books: this.state.books.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf;
          return b;
        } else {
          return b;
        }
      })
    });
    BooksApi.update(book, shelf);
  };

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <Search allBooks = {this.state.books} />} />
        {this.state.books.length > 0 ? (
          <Route
            exact
            path="/"
            render={() => (
              <Shelves
                changeShelf={this.changeShelf}
                allBooks={this.state.books}
              />
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default BooksApp;
