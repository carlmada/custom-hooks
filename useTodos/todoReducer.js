
// function del action de reducer
// array vacio por default
export const todoReducer = (initialState = [], action) => {

    //action.type determina la acion
    switch (action.type) {

        // agregar un nuevo todo
        case '[TODO] Add todo':
            //retornamos un nuevo todo en el state
            return [...initialState, action.payload];

        // eliminar un todo
        case '[TODO] Remove todo':
            // retornamos un nuevo array initialState filtrado 
            // tendrá los todo con id diferente al pasado por parametro
            // asi eliminamos el id pasado en el action.payload
            return initialState.filter(todo => todo.id !== action.payload);

        // cambiar estado del todo 'done'
        case '[TODO] Toggle todo':
            //retornamos un array  con el done cambiado el todo.id           
            return initialState.map(todo => {
                // si el todo es el mismo que el del action...
                if (todo.id === action.payload) { // id
                    //Retornamos el todo del id cambiado el done
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                //Deja el resto igual
                return todo;
            });

        default:
            return initialState;

    }

}; 