const personasUrl = 'https://dummyapi.io/data/api/user';
const app_id      = '6019ce0fe61e0bba93dfb92c';

const obtenerUsuarios = async() => {

    try {

        const myHeaders = new Headers();
        myHeaders.append( 'app-id', app_id );
        
        const resp = await fetch( personasUrl, {
            method: 'GET',
            headers: myHeaders
        });

        const { data:usuarios } = await resp.json();

        return usuarios;

    } catch ( error ) {

        throw error;

    }

}

const obtenerUnUsuario = async( id ) => {

    try {

        const myHeaders = new Headers();
        myHeaders.append( 'app-id', app_id );
        
        const resp = await fetch( `${ personasUrl }/${ id }`, {
            method: 'GET',
            headers: myHeaders
        });

        const usuario = await resp.json();

        return usuario;

    } catch ( error ) {

        throw error;

    }

}

export {
    obtenerUsuarios,
    obtenerUnUsuario
}