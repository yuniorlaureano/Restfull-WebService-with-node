const express = require('express');

function route(Book) {

    const bookRouter = express.Router();

    bookRouter.route('/books').get((req, res) => {

        let query = {};

        if (req.query.genre) {
            query.genre = req.query.genre
        }

        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            }

            return res.json(books);
        });
    });

    bookRouter.route('/books/:id').get((req, res) => {

        Book.findById(req.params.id, (err, books) => {
            if (err) {
                return res.send(err);
            }

            return res.json(books);
        });
    });

    bookRouter.route('/books/:id').put((req, res) => {

        Book.findById(req.params.id, (err, books) => {
            if (err) {
                return res.send(err);
            }

            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            return res.json(books);
        });
    });

    bookRouter.route('/books').post((req, res) => {
        const book = new Book(req.body);
        book.save();
        return res.status(201).json(book);
    });

    return bookRouter;
}

module.exports = route;