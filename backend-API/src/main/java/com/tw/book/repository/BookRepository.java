package com.tw.book.repository;

import com.tw.book.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("BookRepository")
public interface BookRepository extends JpaRepository<Book, Long> {
}
