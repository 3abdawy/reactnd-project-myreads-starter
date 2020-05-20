import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from "./BooksAPI";
import Book from "./Components/Book";

class Search extends Component {
  state = {
    query: "",
    books: null,
    err: null
  };

  inputHandler = e => {
    console.log(e.target.value);
    this.setState({ query: e.target.value });
    if (this.state.query !== "" ) {
      BooksApi.search(this.state.query)
        .then(res => res)
        .then(data => {
          console.log(data);
          if (Array.isArray(data)) {
            this.setState({ books: data });
          }else {
            this.setState({
              books: null,
              err:"Error"
            });
          }
        })
    }
  };

  componentDidMount() {}
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.inputHandler}
              value={this.state.query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books ? (
              this.state.books.map(book => {
                return (
                  <Book
                    key={book.id}
                    title={book.title}
                    authors={book.authors}
                    img={book.imageLinks.thumbnail}
                  />
                );
              })
            ) : (
              <p>No rendered books right Now !</p>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default Search;
