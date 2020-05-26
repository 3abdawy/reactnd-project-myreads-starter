import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Search from "./Containers/Search";
import * as BooksApi from "./BooksAPI";
import Shelves from "./Containers/Shelves";

class BooksApp extends Component {
  state = {
    books: [],
    query: "",
    searchedBooks: []
  };

  componentDidMount() {
    BooksApi.getAll()
      .then(res => res)
      .then(data => {
        this.setState({ books: data });
      });
  }

  inputHandler = e => {
    this.setState({ query: e.target.value });
    if (this.state.query !== "") {
      BooksApi.search(this.state.query)
        .then(res => res)
        .then(data => {
          if (Array.isArray(data)) {
            this.setState({ searchedBooks: data });
          } else {
            console.log(data);
            this.setState({
              searchedBooks: [],
              err: "Error"
            });
          }
        });
    } 
  };
  changeShelf = (book, shelf) => {
    if (shelf !== "none") {
      this.setState(prevState => ({
        books: prevState.books.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf;
            return b;
          } else {
            return b;
          }
        })
      }));
      BooksApi.update(book, shelf);
    } else {
      const newBooks = this.state.books.filter(item => item !== book);
      this.setState(prevState => ({
        ...this.state,
        books: newBooks
      }));
      BooksApi.update(book, shelf);
    }
  };

  updateShelf = (book, shelf) => {
    const newBook = { id: book.props.id };
    // this.changeShelf(book,shelf);
    console.log(shelf);

    BooksApi.update(newBook, shelf)
      .then(res => {
        return res;
      })
      .then(
        () =>
          BooksApi.getAll()
            .then(res => res)
            .then(data => {
              this.setState({
                ...this.state,
                books: data
              });
            })
      );
  };
  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <Search
              updateShelf={this.updateShelf}
              allBooks={this.state.books}
              searchedBooks={this.state.searchedBooks}
              inputHandler={this.inputHandler}
              query={this.state.query}
              shelf={this.state.shelf}
            />
          )}
        />
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
