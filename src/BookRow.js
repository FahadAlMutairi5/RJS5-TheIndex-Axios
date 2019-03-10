import React, { Component } from "react";

class BookRow extends Component {
  render() {
    const book = this.props.book;
    const author = this.props.author;
    let name = book.authors.map(author => author.name)
    

    return (
      <tr>
        <td>{book.title}</td>
        <td>
          {book.authors.map(author => <td>{author.name}</td>)}
        </td>
        <td>
          <button className="btn" style={{ backgroundColor: book.color }} />
        </td>
      </tr>
    );
  }
}

export default BookRow;
