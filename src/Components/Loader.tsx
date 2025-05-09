import { useEffect, useState } from "react";

interface Props {
    small?: boolean,
}

export default function Loader(props: Props) {
    const [showText, setShowText] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div className="d-flex flex-column justify-content-center align-items-center px-2 py-3" style={ props.small ? {  maxHeight: '20px' } : {  minHeight: '200px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            {showText && !props.small && (
                <small className="text-muted text-center mt-3 fw-bold">Since this app is running on a free plan, the initial load may take a bit longer. Thanks for your patience!</small>
            )}
        </div>
    )
}