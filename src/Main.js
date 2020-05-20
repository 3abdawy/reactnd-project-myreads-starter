import React, { Component } from "react";
import { Link } from "react-router-dom";
import CurrentlyReading from "./currentlyReading";
import WantToRead from "./wantToRead";
import Read from "./Read";
import * as BooksApi from "./BooksAPI";

class Main extends Component {
  state = {
    books: null,
    currentlyReading: null,
    wantToRead: null,
    read: null
  };
 
  render() {
    if (this.state.books) {
      console.log(this.state.books);
      console.log(this.state.currentlyReading);
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <CurrentlyReading />
            <WantToRead />
            <Read />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            {" "}
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default Main;
