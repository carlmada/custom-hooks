import { useEffect, useReducer } from 'react';
import { todoReducer } from "../todoReducer";

//estado inicial
// usaremos el localStore
//funcion para leer los 'todos' del localStore para iniciar la app
// si no hay 'todos' retorna un array vacio
const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

// hook useTodos con la logica de la app
export const useTodos = () => {

    //useReducer...
    const [todos, dispatch] = useReducer(todoReducer, [] , init)

    // useEffect para efecto secundario cuando 
    // 'todos' cambie
    // los graba en localStorage en tipo string solo
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
        console.log(todos);
    }, [todos]);

    //Funcion que maneja el new todo
    const handleNewTodo = (todo) => {
        //agregar todo con una action
        const action = {
            type: '[TODO] Add todo',
            payload: todo
        }
        // dispatch es la funcion para enviar la action al reducer
        // despachar accion
        dispatch(action);
    }

    //Funcion que maneja el delete todo
    const handleDeleteTodo = (id) => {
        //eliminar un todo
        const action = {
            type: '[TODO] Remove todo',
            payload: id
        }
        // dispatch es la funcion para enviar la action al reducer
        // despachar accion
        dispatch(action);
    }

    //Funcion que maneja el cambio de estado del todo 'done'
    const handleToggleTodo = (id) => {
        // cambiar estado done
        const action = {
            type: '[TODO] Toggle todo',
            payload: id
        }
        // dispatch es la funcion para enviar la action al reducer
        // despachar accion
        dispatch(action);
    }

    // hay que retornar toda la logica...
    return{
        todos, 
        handleNewTodo, 
        handleDeleteTodo, 
        handleToggleTodo,
        todosCount: todos.length, 
        pendingTodosCount: todos.filter(todo => !todo.done).length,
    }
}
