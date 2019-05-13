const express = require('express');
const bookController = require('../controllers/bookController');

function route(Book) {

    const bookRouter = express.Router();
    const controller = bookController(Book);

    bookRouter.route('/books').get(controller.get);

    bookRouter.use('/books/:id', (req, res, next) => {
        Book.findById(req.params.id, (err, books) => {
            if (err) {
                return res.send(err);
            }

            return res.json(books);
        });
    });

    bookRouter.route('/books/:id').get((req, res) => {
        return res.json(req.book);
    });

    bookRouter.route('/books/:id').put((req, res) => {

        const { book } = req;
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        book.save(err => {
            if (err) {
                return res.send(err);
            }
            return res.json(book);
        });
    });

    bookRouter.route('/books/:id').patch((req, res) => {

        const { book } = req;

        if (req.body._id) {
            delete req.body._id;
        }

        Object.entries(req.body).forEach(item => {
            const key = item[0];
            const value = item[1];
            book[key] = value;
        });
        book.save(err => {
            if (err) {
                return res.send(err);
            }
            return res.json(book);
        });
    });

    bookRouter.route('/books').post((req, res) => {
        const book = new Book(req.body);
        book.save();
        return res.status(201).json(book);
    });

    bookRouter.route('/books').post(controller.post);

    return bookRouter;
}

module.exports = route;