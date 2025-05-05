// ProtectedRoute.tsx
import axios from "axios";
import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Ensure the request for user details handles cookies properly
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
        return <div>Loading...</div>; // Prevents rendering children until loading is done
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Render children if authenticated
    return children;
}
