import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangeDetails from '../Components/ChangeDetails';

const Profile = () => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, {
              withCredentials: true
            });
            setUser(res.data.user_full_name);
          } catch (err) {
            console.error('Not logged in');
          }
        };
      
        fetchUser();
    }, []);
      
    const LogOut = async () => {
        try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {}, {
            withCredentials: true 
          });
          if (res.status === 200) {
            navigate('/login');
        }
          console.log('Logged out successfully');
        } catch (err) {
          console.error('Logout error:', err);
        }
    };
      
    return(
      <div className='d-flex flex-column flex-fill justify-content-between'>
        <div>
        
          <h1 className="text-purple mb-4">Profile</h1>
          <h2>Welcome back {user}!</h2>
          <hr></hr>
          <ChangeDetails />
          <h2 className="text-purple my-4">Orders</h2>
        </div>
        <div className='row'>
          <button className=' col-6 col-sm-3 mx-auto btn btn-danger' onClick={LogOut}>Log Out</button>
        </div>
      </div>
    );
}

export default Profile;