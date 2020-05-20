import React, { Component } from "react";

class Book extends Component {
  state = {
    selectRef: React.createRef()
  };

  componentDidMount() {
    if (this.props.optionSelect) {
      switch (this.props.optionSelect) {
        case "currentlyReading":
          {
            this.state.selectRef.current.childNodes[1].setAttribute(
              "selected",
              "true"
            );
          }
          break;
        case "wantToRead":
          {
            this.state.selectRef.current.childNodes[2].setAttribute(
              "selected",
              "true"
            );
          }
          break;
        case "read":
          {
            this.state.selectRef.current.childNodes[3].setAttribute(
              "selected",
              "true"
            );
          }
          break;
        default: {
          this.state.selectRef.current.childNodes[4].setAttribute(
            "selected",
            "true"
          );
        }
      }
    }
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${this.props.img})`
              }}
            ></div>
            <div className="book-shelf-changer">
              <select ref={this.state.selectRef}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
        </div>
      </li>
    );
  }
}
export default Book;
