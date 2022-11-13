import React, { useContext } from 'react';
import BookAPI from '../APIs/BookAPI';
import BookForm from '../Components/BookForm';
import { BookContext } from '../Context/BookContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookCreate = () => {

    const { addBook } = useContext(BookContext);
    const notify = (msg) => toast(msg);

    const book = {
        name : "",
        author : "",
        price : 0,
        rating : 0
    };

    const createBook = async (name,author,price,rating)=>{
        try{
        const response =  await BookAPI.post("/books", {
            name,
            author,
            price,
            rating
          }
          );
          console.log(response);
          addBook(response.data);
        }catch(err){}
    } 

    return (
        <div>
            <center>
            <br /><br />
            <ToastContainer />
            <h3>Add Book</h3>
            <br />
            <BookForm 
                book={book} 
                type="Add Book" 
                successMsg="Added Book Successfully !" 
                handleSubmit={createBook} 
                notify={notify} 
            />
            </center>
        </div>
    );
}
export default BookCreate;