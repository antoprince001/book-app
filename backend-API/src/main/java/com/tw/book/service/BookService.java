package com.tw.book.service;

import com.tw.book.entity.Book;
import com.tw.book.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookService {

    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Book save(Book book) {
        return bookRepository.save(book);
    }

    public Book findById(Long id) throws NoSuchElementException {
        return bookRepository.findById(id).get();
    }

    public void deleteById(Long id) throws NoSuchElementException {
        bookRepository.deleteById(id);
    }
}
