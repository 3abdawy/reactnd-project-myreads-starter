import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from "../BooksAPI";
import SearchedBook from "../Components/SearchedBook";

class Search extends Component {
  state = {
    query: "",
    searchedBooks: null,
    err: null
  };

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
              searchedBooks: null,
              err: "Error"
            });
          }
        });
    }
  };

  render() {
    const updatedSearchBooks = this.state.searchedBooks
      ? this.state.searchedBooks.map(searchBook => {
          this.props.allBooks.map(b => {
            if (searchBook.id === b.id) {
              searchBook.shelf = b.shelf;
            }
            return b;
          });
          return searchBook;
        })
      : null;
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
            {updatedSearchBooks && updatedSearchBooks.length > 1 ? (
              updatedSearchBooks.map(searchedBook => {
                return (
                  <SearchedBook
                    key={searchedBook.id}
                    title={searchedBook.title}
                    authors={searchedBook.authors}
                    img={searchedBook.imageLinks.thumbnail}
                    id={searchedBook.id}
                    optionSelect={
                      searchedBook.shelf ? searchedBook.shelf : "none"
                    }
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
