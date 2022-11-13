package com.tw.book;

import com.tw.book.entity.Book;
import com.tw.book.repository.BookRepository;
import com.tw.book.service.BookService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class BookServiceTest {

    @Autowired
    private BookRepository bookRepository;

    @AfterEach
    void tearDown() {
        bookRepository.deleteAll();
    }

    @Test
    void shouldGetAllBooks() {
        Book book = new Book("Great Gatsby", "Scott Fitzgerald", 179.0f, 4.4f);
        bookRepository.save(book);
        BookService bookService = new BookService(bookRepository);

        List<Book> bookList = bookService.findAll();
        Book lastBook = bookList.get(bookList.size() - 1);

        assertEquals(book.getAuthor(), lastBook.getAuthor());
        assertEquals(book.getId(), lastBook.getId());
        assertEquals(book.getName(), lastBook.getName());
        assertEquals(book.getRating(), lastBook.getRating());
        assertEquals(book.getPrice(), lastBook.getPrice());
    }

    @Test
    void shouldSaveABook() {
        BookService bookService = new BookService(bookRepository);
        Book book = new Book("Great Gatsby", "Scott Fitzgerald", 179.0f, 4.4f);

        bookService.save(book);

        assertEquals(1.0, bookRepository.count());
    }

    @Test
    void shouldGetABookById() {
        BookService bookService = new BookService(bookRepository);
        Book book = new Book("Great Gatsby", "Scott Fitzgerald", 179.0f, 4.4f);
        Book savedBook  = bookService.save(book);


        Book bookFetched = bookService.findById(savedBook.getId());

        assertEquals(book.getAuthor(), bookFetched.getAuthor());
        assertEquals(book.getId(), bookFetched.getId());
        assertEquals(book.getName(), bookFetched.getName());
        assertEquals(book.getRating(), bookFetched.getRating());
        assertEquals(book.getPrice(), bookFetched.getPrice());
    }

    @Test
    void shouldDeleteABookById() {
        BookService bookService = new BookService(bookRepository);
        Book book = new Book("Great Gatsby", "Scott Fitzgerald", 179.0f, 4.4f);
        Book savedBook = bookService.save(book);

        bookService.deleteById(savedBook.getId());

        assertThrows(NoSuchElementException.class, () -> bookService.findById(savedBook.getId()));
    }


}
