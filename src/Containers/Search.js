import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from "../BooksAPI";
import SearchedBook from "../Components/SearchedBook";

class Search extends Component {
  state = {
    query: "",
    searchedBooks: null,
    err: null,
    updatedSearchBooks: []
  };

  render() {
    let updatedSearchBooks = this.props.searchedBooks && this.props.query
      ? this.props.searchedBooks.map(searchBook => {
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
              onChange={this.props.inputHandler}
              value={this.props.query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {updatedSearchBooks && updatedSearchBooks.length > 1 ? (
              updatedSearchBooks.map(searchedBook => {
                return (
                  <SearchedBook
                    book={searchedBook}
                    updateShelf={this.props.updateShelf}
                    key={searchedBook.id}
                    title={searchedBook.title}
                    authors={searchedBook.authors}
                    img={searchedBook.imageLinks ? searchedBook.imageLinks.thumbnail:null}
                    id={searchedBook.id}
                    shelf={this.props.shelf}
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
