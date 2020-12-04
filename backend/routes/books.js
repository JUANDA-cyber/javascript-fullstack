const { Router } = require('express');
const { findByIdAndDelete } = require('../models/Book');
const router = Router();

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
    const newBook = new Book({title, author, isbn})
    await newBook.save();
    res.json({message: 'Book Saved'});
});

// eliminar un libro
router.delete('/:id', async (req, res) =>{
    // console.log(req.params.id)
    await Book.findByIdAndDelete(req.params.id);
    // console.log(book);
    res.json({message: 'Book Deleted'});
})



module.exports = router;