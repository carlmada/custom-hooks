import { useState } from "react"

//Hook ( custom )
export const useCounter = (initialValue = 10) => {

    const [counter, setcounter] = useState(initialValue);

    //Incrementar
    const increment = () => {
        setcounter(counter + 1);
    }

    //Decrementar
    const decrement = () => {
        // no negativos
        if (counter === 0) return;
        setcounter(counter - 1);
    }

    //Reset
    const reset = () => {
        setcounter(initialValue);
    }

    return {
        counter,
        increment,
        decrement,
        reset,
    }
}