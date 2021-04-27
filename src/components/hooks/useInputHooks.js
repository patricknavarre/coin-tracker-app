import { useState} from 'react';
import { matches } from 'validator';

function useInputHooks() {

    const [input, setInput] = useState("")
    const [inputError, setInputError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")


    function handleInputOnChange(e) {
        let inputValue  = e.target.value;
        let inputName = e.target.name;

        console.log(`${inputName}: ${inputValue}`);

        setInput(inputValue);

        let checkInputNameAndUseRejexAccordingly;
        let errorMessage;

        if (inputName === "First Name" || inputName === "Last Name") {
            checkInputNameAndUseRejexAccordingly = /[!@#$%^&*()\[\],.?":;{}|<>1234567890]/g;
            errorMessage = `${inputName} cannot have any special characters and numbers`;
          } else {
            checkInputNameAndUseRejexAccordingly = /[!@#$%^&*()\[\],.?":;{}|<>]/g;
            errorMessage = `${inputName} cannot have any special characters`;
          }

        if (matches(inputValue, checkInputNameAndUseRejexAccordingly)) {
            setInputError(true);
            setErrorMessage(errorMessage);
        } else {
            setInputError(false);
            setErrorMessage("");
        }
    }

    return [input, handleInputOnChange, inputError, errorMessage];
}

export default useInputHooks;