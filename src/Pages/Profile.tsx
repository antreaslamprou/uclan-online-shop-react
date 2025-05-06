import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
       <>
          <h1 className="text-orange mb-4">Profile</h1>
          <h2>Welcome back {user}</h2>

          <button className='btn btn-danger' onClick={LogOut}>Log Out</button>
       </>
    );
}

export default Profile;