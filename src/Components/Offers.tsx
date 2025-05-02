import { useEffect, useState } from 'react';
import axios from 'axios';

interface Offer {
  offer_title: string;
  offer_dec: string;
}

export default function Offers() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(res => setOffers(res.data))
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
        <h2 className="text-purple mb-3">Offers</h2>
        {(isLoading) ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : (
            <>
            {offers.length === 0 && <h5>No available offers. Stay tuned!</h5>}
            <div className="d-flex gap-3 justify-content-around">
                {offers.map((offer, i) => (
                <div key={i} className="offer card card-body bg-body-secondary text-center">
                    <h5 className="text-orange">{offer.offer_title}</h5>
                    <p className="card-text">{offer.offer_dec}</p>
                </div>
                ))}
            </div>
            </>
        )}
        </>
    );
}