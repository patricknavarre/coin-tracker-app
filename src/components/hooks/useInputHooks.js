import { useState} from 'react';

function useInputHooks() {

    const [input, setInput] = useState("")


    function handleInputOnChange(e) {
        let inputValue = e.target.value;
        let inputName = e.target.name;

        console.log(`${inputName}: ${inputValue}`);
        
        setInput(inputValue);

    }

    return [input, handleInputOnChange];
}

export default useInputHooks;