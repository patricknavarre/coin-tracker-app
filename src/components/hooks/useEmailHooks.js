import  { useState } from 'react';
import { isEmail } from 'validator';

function useEmailHooks() {
    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleEmailOnChange(e) {
        let emailInputValue  = e.target.value;
    
        // console.log(`${emailName}: ${emailValue}`);

        setEmail(emailInputValue);

        if (isEmail(emailInputValue)) {
            setIsEmailError(false);
            setErrorMessage("");
        } else {
            setIsEmailError(true);
            setErrorMessage("Please enter a valid email");
        }
    }

    return [
        email, 
        handleEmailOnChange, 
        isEmailError, 
        errorMessage, 
    ];

}

export default useEmailHooks;