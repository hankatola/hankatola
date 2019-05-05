import React, { useState, useEffect } from 'react'
import API from '../utils/API'
import { Container } from './Grid'
import Book from './Book'

const Page = () => {

  const [books, setBooks] = useState([])

  const saved = () => {
    API.getDbBooks().then(res => {
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
        for (let i in currentBooks) if (currentBooks[i]._id === _id) currentBooks.splice(i,1)
        setBooks(currentBooks)
      }
    })
  }
  useEffect(()=>{saved()},[])

  return (
    <Container fluid>Saved Books
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
  )
}

export default Page