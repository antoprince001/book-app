import './App.css';
import Navbar from './Components/Navbar';
import BookRoutes from './BookRoutes';
import { BookContextProvider } from './Context/BookContext';

function App() {
  return (
    <BookContextProvider>
    <div className="App">
      <Navbar />
      <BookRoutes />
    </div>
    </BookContextProvider>
  );
}

export default App;
