import { useEffect, useState } from "react";

// Podemos crear un cache para hacer mas rapido la carga de datos 
// es una variable global fuera del hook useFetch y useEffect
// se va rellenando con las peticiones que va haciendo

const localCache = {};

export const useFetch = (url) => {

    //trabajamos con la peticion http

    //creamos un useState.. con estado inicial...
    const [state, setState] = useState({
        //datos default..
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });

    //useEffect para gestionar el fetch...
    useEffect(() => {

        //lamada al fetch...
        getFetch();

    }, [url]);

    //estado cuando se cambie la url desde fuera
    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        });
    };

    //metodo de peticion http... con await...
    const getFetch = async () => {

        //Comprobamos si la peticion ya esta en el cache...
        if (localCache[url]) {
            console.log('usando cache');
            //Si ya esta, pasamos los datos del cache al state
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            })
            //terminamos aqui.
            return;
        }

        //setear cuando la url cambie
        setLoadingState();

        //peticion
        const resp = await fetch(url);

        //hacemos un retardo ficticio de 0.5"
        await new Promise(resolve => setTimeout(resolve, 500));

        //Si falla la peticion, hacemos un setState..
        //con los datos de resp 
        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                },
            });
            return;
        }

        // si no hay fallos, leemos los datos...
        //data de resp
        const data = await resp.json();
        //hacemos setState con la data...
        //cambiamos el state con los datos nuevos
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        });

        //Aqui manejamos el cache...
        //añadimos la url de la respuesta
        localCache[url] = data;
    };

    //lo que retornamos...
    //hacia otros componentes.
    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    };

}
