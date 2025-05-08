import { useState } from "react";

interface Props {
    label?: string,
    iconClass: string ,
    type: string;
    name: string,
    isDisabled?: boolean,
    defaultValue?: string,
    placeholder?: string, 
    onChangeCallback?: (value: string) => void,
    required?: boolean,
    showPasswordLegend?: boolean
}

export default function Form(props: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [value, setValue] = useState(props.defaultValue || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue); 
        props.onChangeCallback?.(newValue);
    };
   
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

    return(
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">{props.label ? props.label : props.name}</label>
            <div className="input-group position-relative mb-3">
                <span className="input-group-text">
                    <i className={`bi ${props.iconClass}`}></i>
                </span>
                <input 
                    id={props.name}
                    type={props.type === "password" ? (showPassword ? "text" : "password") : props.type}
                    value={props.defaultValue}
                    disabled={props.isDisabled}
                    className="form-control" 
                    placeholder={props.placeholder} 
                    onChange={handleChange}
                    required={props.required}
                    {...props.type === 'password' && {
                        pattern:"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
                        title:"Must contain at least one number and one lowercase and uppercase letter, and at least 8 or more characters"
                    }}
                    {...props.showPasswordLegend && {
                        onFocus: () => setIsPasswordFocused(true),
                        onBlur: () => setIsPasswordFocused(false)
                    }}
                />
                {props.type === "password" && (
                    <button
                    id="show-pass-btn"
                    type="button"
                    className="btn position-absolute top-0 end-0 border-0 m-0"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={props.isDisabled}
                    {...props.showPasswordLegend && {
                        onFocus: () => setIsPasswordFocused(true),
                        onBlur: () => setIsPasswordFocused(false)
                    }}
                    >
                        <i className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                </button>
                )}           
            </div>
            {props.showPasswordLegend && isPasswordFocused && (
                <div id="password-validation" className="my-3">
                    <h5>Password must contain the following:</h5>
                    <div className="ps-2">
                        <PasswordRule isValid={/[0-9]/.test(value)}>A <b>number</b></PasswordRule>
                        <PasswordRule isValid={/[a-z]/.test(value)}>A <b>lowercase</b> letter</PasswordRule>
                        <PasswordRule isValid={/[A-Z]/.test(value)}>A <b>capital (uppercase)</b> letter</PasswordRule>
                        <PasswordRule isValid={value.length >= 8}>Minimum <b>8 characters</b></PasswordRule>
                    </div>
                </div> 
            )}
        </div>
    )
}