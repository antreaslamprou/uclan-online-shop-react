import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

interface Offer {
  offer_title: string;
  offer_dec: string;
}

export default function Offers() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}`)
        .then(res => setOffers(res.data))
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false));
    }, []); 

    return (
        <>
        <h1 className="text-purple mb-3">Offers</h1>
        {(isLoading) ? (
            <Loader />
        ) : (
            <>
            {offers.length === 0 && <h5>No available offers. Stay tuned!</h5>}
            <div className="row gap-3 px-2 justify-content-around">
                {offers.map((offer, i) => (
                <div key={i} className="col-12 col-md-3 offer card card-body bg-body-secondary text-center">
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