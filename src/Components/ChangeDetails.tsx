import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    user_full_name : string,
    user_email: string,
    user_pass: string,
    user_address: string,
}

export default function ChangeDetails() {
    const [user, setUser] = useState<User>({
        user_full_name: '',
        user_email: '',
        user_pass: '',
        user_address: '',
    });
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, {
              withCredentials: true
            });
            setUser(res.data);
          } catch (err) {
            console.error('Not logged in');
          }
        };
      
        fetchUser();
    });
    
    return(
        <>
            <h2 className="text-purple my-4">Details</h2>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="bi bi-person-lines-fill"></i></span>
                <input type="text" disabled={isEnabled ? false : true} className="form-control" placeholder="Full Name" value={user.user_full_name} aria-label="Full Name" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                <input type="text" disabled={isEnabled ? false : true} className="form-control" placeholder="Email" value={user.user_email} aria-label="Email" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="bi bi-key-fill"></i></span>
                <input type="text" disabled={isEnabled ? false : true} className="form-control" placeholder="Password" value={user.user_pass} aria-label="Password" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="bi bi-pin-map-fill"></i></span>
                <input type="text" disabled={isEnabled ? false : true} className="form-control" placeholder="Address" value={user.user_address} aria-label="Address" />
            </div>
            <div className="row justify-content-center gap-3 mt-4 mb-5">
                <button type='button' className="btn btn-secondary col-5" onClick={() => setIsEnabled(prev => !prev)}>{isEnabled ? "Cancel" : "Edit"}</button>
                <button type='submit' className="btn btn-success col-5" disabled={isEnabled ? false : false}>Confirm</button>
            </div>

        </>
    )
}