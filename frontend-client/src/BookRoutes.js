import { BrowserRouter,  Routes, Route } from "react-router-dom";
import Home from './Routes/Home';
import BookUpdate from './Routes/BookUpdate';
import BookCreate from "./Routes/BookCreate";
import NotFound from "./Routes/NotFound";

const BookRoutes = ()=>{
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' exact element={ <Home />} />
            <Route path='/books/:id/update' exact element={ <BookUpdate />} />
            <Route path='/books/create' exact element={ <BookCreate />} />
            <Route path='*' element={ <NotFound />} />
        </Routes>
        </BrowserRouter>
    )
}
export default BookRoutes;