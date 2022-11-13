import React , { useContext } from 'react';
import {  useParams } from 'react-router-dom';
import BookAPI from '../APIs/BookAPI';
import BookForm from '../Components/BookForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookContext } from "../Context/BookContext";

const BookUpdate = () => {

    const notify = (msg) => toast(msg);
    const { id } = useParams();
    const { selectedBook } = useContext(BookContext);

    const updateBook = async (name, author, price, rating) => {
        try {
            const response = await BookAPI.put(`/books/${id}`, {
                name,
                author,
                price,
                rating
            }
            );
            console.log(response);
        } catch (err) { }
    }

    // useEffect(() => {
    //     fetchBook(Number(id));
    // }, []);

    return (
        <div>
            <center>
                <br /><br />
                <ToastContainer />
                <h3>Update Book</h3>
                <br />
                <BookForm 
                    book={selectedBook} 
                    type="Update Book" 
                    successMsg="Updated Book Successfully !" 
                    handleSubmit={updateBook} 
                    notify={notify} 
                />
            </center>
        </div>
    );
}
export default BookUpdate;