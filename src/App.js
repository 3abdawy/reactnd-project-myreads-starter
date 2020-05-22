import React from "react";
// import * as BooksAPI from './BooksAPI'
import { Route } from "react-router-dom";
import "./App.css";
import Search from "./Search";
import * as BooksApi from "./BooksAPI";
import Shelves from "./Shelves";

class BooksApp extends React.Component {
  state = {
    books: []
  };
  componentDidMount() {
    BooksApi.getAll()
      .then(res => res)
      .then(data => {
        this.setState({ books: data });
        console.log(this.state.books);
      });
  }

  changeShelf = (book, shelf) => {
    this.setState({
      books: this.state.books.map(b => {
        if (b.id === book.id) {
           b.shelf = shelf
           return b;
        } else {
          return b;
        }
      })
    });
    console.log(this.state.books);
  };
  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search} />
        {this.state.books.length > 0 ? (
          <Route
            exact
            path="/"
            render={props => (
              <Shelves
                {...props}
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
