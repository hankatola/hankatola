import React from 'react'
import {Container} from '../Grid'
import './index.css'

const Book = props => {
  const {book, save, unsave} = props

  const SaveUnsaveBtn = book => {
    const id = getIfExists(book,'book.id')
    const _id = getIfExists(book, 'book._id', false)
    if (_id) {
      return (
        <div className="btn btn-danger" value={_id} onClick={() => unsave(_id)}>Unsave</div>
      )
    }
    return (
      <div className="btn btn-secondary" value={id} onClick={() => save(id)}>Save</div>
    )
  }
  const getIfExists = (obj, field, nullVal='') => {
    const get = function(obj, key) {
      return key.split(".").reduce(function(o, x) {
        return (typeof o == "undefined" || o === null) ? o : o[x];
      }, obj);
    }
    const runGet = get(obj,field)
    return runGet ? runGet : nullVal
  }

  return (
    <Container>
      <div className="card mb-3">
        <div className="row">
          <div className="col col-2">
            <img className="card-img-left" src={ getIfExists(book,'volumeInfo.imageLinks.thumbnail') } alt="Card image cap" />
          </div>
          <div className="col col-10">
            <div className="card-body">
              <h5 className="card-title">{ getIfExists(book,'volumeInfo.title') }</h5>
              <p className="card-text"><small className="text-muted">{ getIfExists(book,'searchInfo.textSnippet') }</small></p>
              <p className="card-text">{ getIfExists(book,'volumeInfo.description') }</p>
              <SaveUnsaveBtn book={book}/>
              <a className="btn btn-primary" href={ getIfExists(book,'volumeInfo.canonicalVolumeLink') } target="_blank">View on Google Books</a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Book