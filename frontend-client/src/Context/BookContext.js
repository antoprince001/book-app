import React,{ useState, createContext } from "react";

export const BookContext = createContext("");

export const BookContextProvider = props =>{

    const [books, setBooks] = useState([]);
    const [selectedBook,setSelectedBook] = useState({
        id : 0,
        name : "",
        author : "",
        price : 0,
        rating : 0
    });

    const addBook = (book) =>{
        setBooks([...books,book]);
    };

    return (
        <BookContext.Provider value={{
            books,
            setBooks,
            addBook,
            selectedBook,
            setSelectedBook
          }}
        >
            {props.children}
        </BookContext.Provider>
    )
}
