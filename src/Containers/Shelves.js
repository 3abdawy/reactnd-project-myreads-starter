import React, { Component } from "react";
import Shelf from "../Components/Shelf";
import { Link } from "react-router-dom";

class Shelves extends Component {
  render() {
    const allBooks = this.props.allBooks;
    const currentlyReading = allBooks.filter(
      b => b.shelf === "currentlyReading"
    );
    const wantToRead = allBooks.filter(b => b.shelf === "wantToRead");
    const read = allBooks.filter(b => b.shelf === "read");
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              changeShelf={this.props.changeShelf}
              type="currentlyReading"
              books={currentlyReading}
            />
            <Shelf
              changeShelf={this.props.changeShelf}
              type="wantToRead"
              books={wantToRead}
            />
            <Shelf
              changeShelf={this.props.changeShelf}
              type="read"
              books={read}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Shelves;
