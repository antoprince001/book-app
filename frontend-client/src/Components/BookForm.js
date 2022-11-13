import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookForm = ({ book, handleSubmit, type, successMsg, notify}) => {

    const [name, setName] = useState(book.name);
    const [author, setAuthor] = useState(book.author);
    const [price, setPrice] = useState(book.price);
    const [rating, setRating] = useState(book.rating);

    const navigate = useNavigate();

    const reset = () => {
        setName("");
        setAuthor("");
        setPrice(0);
        setRating(0);
    }

    const back = () => {
        navigate('/');
    }

    const handler = (e) => {
        e.preventDefault();

        if (name.trim() === "" || name === undefined) {
            notify("Check name field !");
        }
        else if (author.trim() === "" || author === undefined) {
            notify("Check author field !");
        }
        else if (Number(price) < 0 || price === "" || price === undefined) {
            notify("Check price field !");
        }
        else if (Number(rating) < 0 || Number(rating) > 5 || rating === "" || rating === undefined) {
            console.log(parseFloat(rating));
            notify("Rating should be between 0-5");
        }
        else {
            handleSubmit(name, author, price, rating);
            reset();
            notify(successMsg);
            navigate('/');
        }
    }

    return (
        <form>
            <div className="col-6">
                <label for="value" className="form-label">Book Name :</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <br />

            <div className="col-6">
                <label for="value" className="form-label">Author :</label>
                <input
                    type="text"
                    className="form-control"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <br />

            <div className="col-6">
                <label for="value" className="form-label">Price :</label>
                <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
            </div>
            <br />

            <div className="col-6">
                <label for="value" className="form-label">Rating</label>
                <input
                    type="number"
                    className="form-control"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)} />
            </div>
            <br />

            <div className="col-5">
                <button type="button" class="btn btn-dark" id="submit" onClick={back}>Back</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" class="btn btn-primary" id="submit" onClick={handler}>{type}</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" class="btn btn-light" onClick={reset}>Reset</button>
            </div>

        </form>
    );
}
export default BookForm;

