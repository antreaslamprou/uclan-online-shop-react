import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Protected from "./Protected";

interface Review {
    id: number,
    user_id: number,
    product_id: number,
    review_title: string,
    review_desc: string,
    review_rating: number,
}

export default function Reviews() {
    const { id: productId } = useParams();

    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [rating, setRating] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');

    const fetchReviews = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/${productId}`);
          console.log(res.data);
          setReviews(res.data);
        } catch (error) {
          console.error('Failed to load reviews:', error);
        } finally {
          setIsLoading(false);
        }
    };

    useEffect(() => {        
        fetchReviews();
    }, [productId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/reviews/${productId}`, {
                title,
                details,
                rating
            }, {
                withCredentials: true,
            });

            if (res.status === 200) {
                await fetchReviews();
            }

        } catch (error) {
            console.error('Failed to load reviews:', error);
        } 
    }
    
    function StarButton({ rate }: { rate: number }) {
        return (
            <button 
            type="button" 
            className="btn border-0 p-0"
            onClick={() => setRating(rate)}>
                {rating! >= rate ? (
                    <i className="fs-3 bi bi-star-fill text-orange" />
                ) : (
                    <i className="fs-3 bi bi-star text-orange" />
                )}
            </button>
        );
    }

    function ShowStars({rate}: {rate: number}) {
        const totalStars = 5;
        const emptyStars = totalStars - rate;
        return (
            <>
                {[...Array(5)].map((_, index) => (
                    <i
                    key={index}
                    className={`fs-3 text-orange bi ${index < rate ? 'bi-star-fill' : 'bi-star'}`}
                    ></i>
                ))}
            </>
        )
    }

    return(
        <>
            <div className="card create-review p-4 my-5">
                <h5 className="mb-3 text-orange">Add a Review</h5>
                <Protected type="Component">
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex gap-2">
                            {[1, 2, 3, 4, 5].map((rate) => (
                                <StarButton key={rate} rate={rate} />
                            ))}
                        </div>
                        <input 
                        id='rating' 
                        name="rating" 
                        type="number" 
                        className="rating-field text-white" 
                        value={rating || ''} 
                        required/>
                        <label htmlFor="title" className="mt-2">Title</label>
                        <input 
                        id="title" 
                        name="title" 
                        type="text" 
                        className="form-control" 
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                        <label htmlFor="details" className="mt-3">Details</label>
                        <input 
                        id='details' 
                        name="details" 
                        type="text" 
                        className="form-control" 
                        onChange={(e) => setDetails(e.target.value)}
                        required />
                        <button type="submit" className="btn btn-primary mt-4">Add Review</button>
                    </form>
                </Protected>

            </div>
            <div className="reviews">
                <h2 className="text-purple mb-4">Customer Reviews</h2>
            {isLoading ? (
                <div className="text-center">Loading reviews...</div>
            ) : reviews.length === 0 ? (
                <div className="alert alert-danger">No reviews yet. Be the first to review!</div>
            ) : (
                <div className="review-list">
                {reviews.map((review) => (
                    <div key={review.id} className="card bg-body-secondary mb-3">
                        <div className="card-body">

                            <h3>{review.review_title}</h3>
                            <div className="d-flex gap-2 mb-2">
                                <ShowStars rate={review.review_rating} />
                            </div>
                            <p>{review.review_desc}</p>


                        </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        </>
    )
}