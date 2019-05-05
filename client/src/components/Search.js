import React, { useState, useEffect } from 'react'
import API from '../utils/API'
import { Container } from './Grid'
import Book from './Book'

const Page = () => {

  const [books, setBooks] = useState([])
  const [google, setGoogle] = useState('')

  const search = () => {
    API.googleBooks(google).then(res => {
      setBooks(res.data)
    })
  }
  const save = id => {
    API.saveDbBook(id).then(res => {
      const saved = res.data
      const currentBooks = [...books]
      for (let i in currentBooks) if (currentBooks[i].id === saved.id) currentBooks[i] = saved
      setBooks(currentBooks)
    })
  }
  const unsave = _id => {
    API.deleteDbBook(_id).then(res => {
      if (res.data.deletedCount > 0) {
        const currentBooks = [...books]
        for (let i in currentBooks) if (currentBooks[i]._id === _id) currentBooks[i]._id = false
        setBooks(currentBooks)
      }
    })
  }

  return (
    <>
      <Container fluid>
        Search
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a book"
            aria-label="search"
            aria-describedby="Search Bar"
            id="searchBar"
            onChange={e => setGoogle(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={search}
            >Search</button>
          </div>
        </div>
      </Container>
      <Container fluid>
        {books.map(book => {
          return (
            <Book
              key={book.id}
              book={book}
              save={save}
              unsave={unsave}
            />
          )
        })}
      </Container>
    </>
  )
}

export default Page