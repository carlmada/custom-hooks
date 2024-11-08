import { useState } from "react";

//lo iniciamos con un initialForm que recibiremos 
//con la estructura del form, un objeto 
export const useForm = (initialForm = {}) => {

    //Pasamos el initialForm como parametro al useState
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    //Funcion de reset del form con valor inicial
    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        //retornamos las variables desestructuradas del form 
        //el formState y el onInputChange...
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}
