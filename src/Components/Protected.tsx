import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Loader from "./Loader";

interface Props{
    type: "Route" | "Component";
    children: ReactNode; 
}

export default function Protected(props: Props) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/auth/user`, { withCredentials: true })
            .then(() => {
                setIsAuthenticated(true);
                setLoading(false);
            })
            .catch(() => {
                setIsAuthenticated(false);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
           <Loader />
        )
    }

    if (!isAuthenticated) {
        return (props.type === "Route") ? <Navigate to="/login" replace /> : <>
                <div className="alert alert-warning">You must be logged in to procceed. Please log in by clicking <Link to='/login' className="fw-bold border-0 text-primary text-decoration-none">here</Link></div>
            </> ;
    }

    return <>{props.children}</>;
}
