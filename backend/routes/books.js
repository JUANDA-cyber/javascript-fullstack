const { Router } = require('express');
const router = Router();
const { unlink } = require('fs-extra'); //fs modulo de node - crea, busca, mueve, elimina archivos, no soporta promesas solo colbacks, el fs-extra si 
const path = require('path');

const Book = require('../models/Book');

// obtener los libros guardados
router.get('/', async  (req, res) => {
    const books = await Book.find() // busca todos los libros en mongodb, evento asincrono
    res.json(books);
});

// guardar un libro
router.post('/', async  (req, res) => {
    // console.log(req.body);
    const { title, author, isbn } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;
    const newBook = new Book({title, author, isbn, imagePath})
    await newBook.save();
    res.json({message: 'Book Saved'});
});

// eliminar un libro
router.delete('/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public' + book.imagePath))
    res.json({message: 'Book Deleted'});
});

module.exports = router;