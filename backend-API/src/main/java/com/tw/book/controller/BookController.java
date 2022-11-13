package com.tw.book.controller;

import com.tw.book.entity.Book;
import com.tw.book.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllBooks() {
        return new ResponseEntity<>(bookService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBook(@PathVariable(value = "id") Long id) {
        try {
            return new ResponseEntity<>(bookService.findById(id), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/books")
    ResponseEntity<Book> create(@RequestBody Book book) {
        return new ResponseEntity<>(bookService.save(book), HttpStatus.CREATED);
    }

    @DeleteMapping("/books/{id}")
    public void deleteBook(@PathVariable(value = "id") Long id) {
        try {
            bookService.deleteById(id);
        } catch (NoSuchElementException e) {
        }
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") Long id, @RequestBody Book book) {
        try {
            Book existingBook = bookService.findById(id);
            existingBook.setRating(book.getRating());
            existingBook.setPrice(book.getPrice());
            existingBook.setName(book.getName());
            existingBook.setAuthor(book.getAuthor());
            return new ResponseEntity<>(bookService.save(existingBook), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
