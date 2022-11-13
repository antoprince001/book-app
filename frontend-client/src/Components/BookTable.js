import { useEffect, useContext, useState } from "react";
import BookAPI from "../APIs/BookAPI";
import { BookContext } from "../Context/BookContext";
import { useNavigate } from "react-router-dom";

const BookTable = () => {

    const { books, setBooks , setSelectedBook } = useContext(BookContext);
    const navigate = useNavigate();
    const [currentPage,setCurrentPage] = useState(1);
    
    let booksPerPage = 2;

    const fetchBook = async (bookId) => {
        try {
            const response = await BookAPI.get(`/books/${bookId}`);
            console.log(response.data);
            setSelectedBook(response.data);
        } catch (err) { }
    };

    const handleUpdate = async (e,id) => {
        e.stopPropagation();
        await fetchBook(id);
        navigate(`books/${id}/update`)
    }

    const fetchBooks = async () => {
        try {
            const response = await BookAPI.get("/books");
            setBooks(response.data);
        } catch (err) { }
    };

    const handleDelete = async (e,id) => {
        e.stopPropagation();
        try {
            await BookAPI.delete(`books/${id}`);
            fetchBooks();
          }catch(err){}
    }

    useEffect(() => {
        fetchBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    let lastIndex = currentPage*booksPerPage;
    let firstIndex = lastIndex - booksPerPage;
    let currentBooks = books.slice(firstIndex,lastIndex);
    let totalPages = Math.ceil(books.length/booksPerPage);

    const handlePrevious = ()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage-1);
        }
    }

    const handleNext = ()=>{
        if(currentPage < Math.ceil(books.length/booksPerPage)){
            setCurrentPage(currentPage+1);
        }
    }

    return (
        <>
        <table className="table table-hover table-success">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Price</th>
                    <th scope="col">Rating</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {books &&
                    books.length === 0 ?
                    <tr align="center">
                        <td colSpan="7">No Books Available</td>
                    </tr> :
                    currentBooks.map((book) => {
                        return (
                            <tr key={book.id}>
                                <th scope="row">{book.id}</th>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                                <td>{book.rating}</td>
                                <td>
                                    <button type="button" class="btn btn-warning" id="update" onClick={(e) => { handleUpdate(e,book.id) }}>
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger" id="delete" onClick={(e) => { handleDelete(e,book.id) }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
             
            <li className="page-item">
                <button className="page-link" onClick={handlePrevious}>Previous</button>
            </li>
            <li className="page-item"><button className="page-link">Showing Page {currentPage} of  {totalPages}</button></li>
            <li className="page-item">
                <button className="page-link" onClick={handleNext}>Next</button>
            </li>
            
        </ul>
    </nav>
    </>
    )
}   
export default BookTable;