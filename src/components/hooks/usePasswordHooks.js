import { useState } from 'react';
import { isStrongPassword } from 'validator';

function usePasswordHooks() {
    const [password, setPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    function handlePasswordOnChange(e) {
        let passwordInputValue = e.target.value;

        setPassword(passwordInputValue);
        // console.log(isStrongPassword(passwordInputValue))

        // if (isStrongPassword(passwordInputValue)) {
        //     setIsPasswordError(false);
        //     setErrorMessage("");
        // } else {
        //     setIsPasswordError(true);
        //     setErrorMessage("That's a weak password.  Your password must minimum 8 characters and must contain an uppercase, a lower case, a number and special character !@#$%^&*()<>{}");
        // }
        
    }
    
    return [
        password, 
        handlePasswordOnChange, 
        isPasswordError, 
        errorMessage,
    ];
}

export default usePasswordHooks;