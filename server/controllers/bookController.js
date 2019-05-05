const db = require('../models')
const request = require('request')
const url = 'https://www.googleapis.com/books/v1/volumes'

// Function Farm
const parseBook = record => {
  // parses out book from db string & attaches _id (the db key) to the object
  const _id = record._id
  const book = JSON.parse(JSON.parse(record.book))
  book._id = _id
  return book
}

module.exports = function () {
  return {
    getDbBooks: (req, res) => {
      // get all books from db
      db.Books.find({}).then(records => {
        for (let i in records) {
          records[i] = parseBook(records[i])
        }
        res.json(records)
      })
    },
    saveDbBook: (req, res) => {
      // save unique book in db after checking for duplicate
      const id = req.params.id
      db.Books.findOne({ id }).then(check => {
        if (!check) {
          // book isn't already saved - save & return it
          const google = {url: `${url}/${id}`}
          request(google, (err, data, body) => {
            db.Books.create({
              id: id,
              book: JSON.stringify(data.body)
            }).then(record => {
              res.json(parseBook(record))
            })
          })
        } else {
          // book is already saved - return it
          res.json(parseBook(check))
        }
      })
    },
    deleteDbBook: (req, res) => {
      // delete book from saved books
      const _id = req.params.id
      db.Books.remove({ _id }).then(response => {
        res.json(response)
      }
      )
    },
    googleBookById: (req, res) => {
      // look up a book from google
      const google = {url: `${url}/${req.params.id}`}
      request(google, (err, data, body) => {
        res.json(JSON.parse(data.body))
      })
    },
    googleBooks: (req, res) => {
      const google = {url: `${url}?q=${req.params.str}`}
      console.log('search term: ', google);
      request(google, (err, data, body) => {
        const googleBooks = JSON.parse(data.body).items
        const ids = []
        for (let i in googleBooks) ids.push(googleBooks[i].id)

        // check database for matching ids
        db.Books.find({id: {$in: ids}}).then(records => {
          // push found dbIds into list as [googleId, dbId]
          const _ids = []
          for (let i in records) _ids.push([records[i].id, records[i]._id])
          // append _id to googleBooks if it exists
          const findPos = (id, _ids) => {
            let x = -1
            for (let i in _ids) if (_ids[i][0] === id) x = i
            return x
          }
          for (let i in ids) {
            const pos = findPos(ids[i],_ids)
            if (pos >= 0) googleBooks[i]._id = _ids[pos][1]
          }
          // return googleBooks as response
          res.json(googleBooks)
        })
      })
    }
  }
}
