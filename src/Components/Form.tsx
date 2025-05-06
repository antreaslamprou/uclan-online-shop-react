import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function Form() {
    const [activeForm, setActiveForm] = useState('Log in');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    const switchForm = (form: string) => {
        setActiveForm(form);
        setErrorMessage(null);
    };

    useEffect(() => {
        setErrorMessage(null);
    }, [email, password, name, address]);

    function PasswordRule({ isValid, children }: { isValid: boolean; children: React.ReactNode }) {
        return (
          <div className={`${isValid ? "valid text-success" : "invalid text-danger"} d-flex align-items-center`}>
            <i
              className={`bi ${isValid ? "bi-check text-success" : "bi-x text-danger"} fs-2 me-2`}
            ></i>
            <span>{children}</span>
          </div>
        );
    }

        const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
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
                    return;
                }

                const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, credentials, {
                    withCredentials: true
                });           
                if (res.status === 200) {
                    navigate('/profile');
                }
            }
        } catch (err) {
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
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id='email'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="field-group position-relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                                title="Must contain at least one number and one lowercase and uppercase letter, and at least 8 or more characters"
                                placeholder="Enter your password"
                                className="form-control"
                                required
                            />
                            <button
                                type="button"
                                className="btn position-absolute top-0 end-0"
                                onClick={() => setShowPassword((prev) => !prev)}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                >
                                <i className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                            </button>
                        </div>
                    </div>
                    {errorMessage && (<div className="text-danger">{errorMessage}</div>)}
                    <button type="submit" className="btn btn-secondary mt-4">Log in</button>
                </form>
                </>
            ) : (
                <>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            id='name'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id='email'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="field-group position-relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                                title="Must contain at least one number and one lowercase and uppercase letter, and at least 8 or more characters"
                                placeholder="Enter your password"
                                className="form-control"
                                required
                            />
                            <button
                                type="button"
                                className="btn position-absolute top-0 end-0"
                                onClick={() => setShowPassword((prev) => !prev)}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                >
                                <i className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                            </button>
                        </div>
                    </div>
                    {isPasswordFocused && (
                        <div id="password-validation" className="my-3">
                            <h5>Password must contain the following:</h5>
                            <div className="ps-2">
                                <PasswordRule isValid={/[0-9]/.test(password)}>A <b>number</b></PasswordRule>
                                <PasswordRule isValid={/[a-z]/.test(password)}>A <b>lowercase</b> letter</PasswordRule>
                                <PasswordRule isValid={/[A-Z]/.test(password)}>A <b>capital (uppercase)</b> letter</PasswordRule>
                                <PasswordRule isValid={password.length >= 8}>Minimum <b>8 characters</b></PasswordRule>
                            </div>
                        </div> 
                    )}
                    <div className="mb-3">
                        <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                        <div className="field-group position-relative">
                            <input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="form-control"
                                required
                            />
                            <button
                                type="button"
                                className="btn position-absolute top-0 end-0"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                <i className={showConfirmPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                            </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            id="address"
                            type="textarea"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                            className="form-control"
                            required
                        />
                    </div>
                    {errorMessage && (<div className="text-danger">{errorMessage}</div>)}
                    <button type="submit" className="btn btn-secondary mt-4">Submit</button>
                </form>
            </>
            )}
            <button type="button" className="btn border-0 mt-4" onClick={() => switchForm(activeForm === 'Log in' ? 'Sign up' : 'Log in')}>Already have an account? Click here to go to {activeForm === 'Log in' ? 'Sign up' : 'Log in'}!</button>
       </>
    );
}