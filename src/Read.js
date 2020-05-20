import React, { Component } from "react";
import * as BooksApi from "./BooksAPI";
import Book from "./Components/Book";
import Spinner from "./Components/UI/Spinner/Spinner";

class Read extends Component {

  state = {
    books:null,
    read:null
  };
  componentDidMount() {
    BooksApi.getAll()
      .then(books => {
        this.setState(() => ({
          books: books
        }));
      })
      .then(() => {
        let books = this.state.books;
        let arr = Object.keys(books)
          .map(value => {
            return books[value];
          })
          .filter(book => {
            return book.shelf === "read";
          });
        console.log(arr);
        this.setState(() => ({
          ...this.state,
          read: arr
        }));
      });
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.state.read
              ? this.state.read.map(book => {
                  return (
                    <Book
                      key={book.id}
                      title={book.title}
                      authors={book.authors.join(" , ")}
                      img={book.imageLinks.thumbnail}
                      optionSelect = {book.shelf}
                    />
                  );
                })
              : <Spinner/>}
          </ol>
        </div>
      </div>
    );
  }
}
export default Read;
