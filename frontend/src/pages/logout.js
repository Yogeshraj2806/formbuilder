import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        localStorage.clear();
        navigate('/');
    }

    return(
        <>
            <button className="btn" onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Logout;