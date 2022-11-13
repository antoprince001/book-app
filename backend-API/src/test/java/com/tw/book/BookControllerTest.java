package com.tw.book;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tw.book.entity.Book;
import com.tw.book.service.BookService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@ExtendWith(SpringExtension.class)
@WebMvcTest
public class BookControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Test
    void getAllBooks() throws Exception {
        List<Book> bookList = new ArrayList<>();
        bookList.add(new Book("Great Gatsby", "Scott Fitzgerald", 179.0f, 4.4f));
        when(bookService.findAll()).thenReturn(bookList);

        mockMvc.perform(MockMvcRequestBuilders.get("/books")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(jsonPath("$", hasSize(1))).andDo(print());
    }

    @Test
    void createABook() throws Exception {
        Book book = new Book("Great Gatsby", "Scott Fitzgerald", 179.0f, 4.4f);
        when(bookService.save(ArgumentMatchers.any(Book.class))).thenReturn(book);
        ObjectMapper objectMapper = new ObjectMapper();
        String bookJSON = objectMapper.writeValueAsString(book);

        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bookJSON)
        );

        result.andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Great Gatsby"))
                .andExpect(jsonPath("$.author").value("Scott Fitzgerald"))
                .andExpect(jsonPath("$.price").value(179.0f))
                .andExpect(jsonPath("$.rating").value(4.4f));
    }

    @Test
    void getABookById() throws Exception {
        Book book = new Book("Great Gatsby", "Scott Fitzgerald", 179.0f, 4.4f);
        when(bookService.findById(0L)).thenReturn(book);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/books/0")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", Matchers.is("Great Gatsby")));
    }

    @Test
    void deleteABookById() throws Exception {
        List<Book> bookList = new ArrayList<>();
        Book book = new Book("Great Gatsby", "Scott Fitzgerald", 179.0f, 4.4f);
        bookList.add(book);
        when(bookService.findById(0L)).thenReturn(bookList.get(0));

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/books/0"));
    }

    @Test
    void updateABookById() throws Exception {
        Book book = new Book("Great Gatsby", "Scott Fitzgerald", 150.0f, 4.5f);
        book.setId(0L);
        when(bookService.findById(0L)).thenReturn(book);
        when(bookService.save(ArgumentMatchers.any(Book.class))).thenReturn(book);
        ObjectMapper objectMapper = new ObjectMapper();
        String bookJSON = objectMapper.writeValueAsString(book);

        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.put("/books/0")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bookJSON)
        );

        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Great Gatsby"))
                .andExpect(jsonPath("$.author").value("Scott Fitzgerald"))
                .andExpect(jsonPath("$.price").value(150.0f))
                .andExpect(jsonPath("$.rating").value(4.5f));
    }
}
