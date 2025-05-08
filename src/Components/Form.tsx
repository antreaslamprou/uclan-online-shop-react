import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import FormField from "./FormField";
import Loader from "./Loader";


export default function Form() {
    const [activeForm, setActiveForm] = useState<'Log in' | 'Sign up'>('Log in');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isWaitingData, setIsWaitingData] = useState(false);

    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    const switchForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAddress('');
        setActiveForm(prev => prev === 'Log in' ? 'Sign up' : 'Log in')
        setErrorMessage(null);
    };

    useEffect(() => {
        setErrorMessage(null);
    }, [email, password, name, address]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsWaitingData(true);
            if (activeForm === 'Log in') {
                const credentials = {
                    email,
                    password
                    };
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login` , credentials, {
                    withCredentials: true
                });
                if (res.status === 200) {
                    navigate('/profile');
                }
                
            } else {
                const credentials = {
                    email,
                    password,
                    name,
                    address
                };

                if (password !== confirmPassword) {
                    setErrorMessage("Passwords don't match!");
                    setIsWaitingData(false);
                    return;
                }

                const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, credentials, {
                    withCredentials: true
                });           
                if (res.status === 200 || res.status === 201) {
                    navigate('/profile');
                }
            }
        } catch (err) {
            setIsWaitingData(false);
            const error = err as AxiosError<{ error: string }>;
            setErrorMessage(error.response!.data.error);
            console.log('Auth error:', error.message);
        }
    };

    return(
       <>
            <h1 className="mb-5">{activeForm}</h1>
            {(activeForm === 'Log in') ? (
                <>
                <form onSubmit={handleSubmit}>
                    <FormField iconClass="bi-envelope-fill" defaultValue={email} type="email" name="Email" placeholder="Email" onChangeCallback={(newEmail) => setEmail(newEmail)} required={true} />
                    <FormField iconClass="bi-key-fill" defaultValue={password} type="password" name="Password" placeholder="Password" onChangeCallback={(newPassword) => setPassword(newPassword)} required={true} />
                    {errorMessage && (<div className="text-danger">{errorMessage}</div>)}
                    <button type="submit" className="btn btn-secondary mt-4" disabled={isWaitingData}>{isWaitingData ? <Loader small={true} /> : "Log in "}</button>
                </form>
                </>
            ) : (
                <>
                <form onSubmit={handleSubmit}>
                    <FormField label="Full Name" defaultValue={name} iconClass="bi-person-lines-fill" type="text" name="Full Name" placeholder="Full Name" onChangeCallback={(newName) => setName(newName)} required={true} /> 
                    <FormField label="Email" defaultValue={email} iconClass="bi-envelope-fill" type="email" name="email" placeholder="Email" onChangeCallback={(newEmail) => setEmail(newEmail)} required={true} />
                    <FormField label="Password" defaultValue={password} showPasswordLegend={true} iconClass="bi-key-fill" type="password" name="password" placeholder="Password" onChangeCallback={(newPassword) => setPassword(newPassword)} required={true} />
                    <FormField label="Confirm Password" defaultValue={confirmPassword} iconClass="bi-key" type="password" name="confirm-password" placeholder="Confirm Password" onChangeCallback={(newConfirmPassword) => setConfirmPassword(newConfirmPassword)} required={true} />
                    <FormField label="Address" defaultValue={address} iconClass="bi-pin-map-fill" type="text" name="address" placeholder="Address" onChangeCallback={(newAddress) => setAddress(newAddress)} required={true} /> 
                    {errorMessage && (<div className="text-danger">{errorMessage}</div>)}
                    <button type="submit" className="btn btn-secondary mt-4" disabled={isWaitingData}>{isWaitingData ? <Loader small={true} /> : "Register "}</button>
                </form>
            </>
            )}
            <button type="button" className="btn border-0 mt-4" onClick={switchForm}>Already have an account? Click here to go to {activeForm === 'Log in' ? 'Sign up' : 'Log in'}!</button>
       </>
    );
}