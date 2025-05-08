import axios from "axios";
import { useEffect, useState } from "react";
import FormField from "./FormField";

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
                <FormField iconClass="bi-person-lines-fill" isDisabled={!isEnabled} type="text" name="Full Name" defaultValue={user.user_full_name} placeholder="Full Name" onChangeCallback={(newName) => setUser(prevUser => ({...prevUser,user_full_name: newName}))} />
                <FormField iconClass="bi-envelope-fill" isDisabled={!isEnabled} type="email" name="Email" defaultValue={user.user_email} placeholder="Email" onChangeCallback={(newEmail) => setUser(prevUser => ({...prevUser,user_email: newEmail}))} />
                <FormField iconClass="bi-key-fill" isDisabled={!isEnabled} type="password" name="Password" defaultValue={user.user_pass} placeholder="Password" onChangeCallback={(newPassword) => setUser(prevUser => ({...prevUser,user_pass: newPassword}))} />
                <FormField iconClass="bi-pin-map-fill" isDisabled={!isEnabled} type="text" name="Address" defaultValue={user.user_address} placeholder="Address" onChangeCallback={(newAddress) => setUser(prevUser => ({...prevUser,user_address: newAddress}))} />
            <div className="row justify-content-center gap-3 mt-4 mb-5">
                <button type='button' className="btn btn-secondary col-5" onClick={() => setIsEnabled(prev => !prev)}>{isEnabled ? "Cancel" : "Edit"}</button>
                <button type='submit' className="btn btn-success col-5" disabled={isEnabled ? false : false}>Confirm</button>
            </div>

        </>
    )
}