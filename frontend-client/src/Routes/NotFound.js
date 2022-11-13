import { Link } from "react-router-dom";

const NotFound = ()=>{
    return (
        <>
        <br></br>
        <br></br>
        <h1>OOPs</h1><br></br>
        <h2>Requested Page Not Found !</h2>
        <Link to="/">Go Home</Link>
        </>
    )
};

export default NotFound;