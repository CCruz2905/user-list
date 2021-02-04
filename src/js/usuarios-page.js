import { obtenerUnUsuario, obtenerUsuarios } from "./http-provider";
import '../styles.css';

const body     = document.body;
let tbody;
let numeracion;
let btn;

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const crearHtml = () => {
    
    const html = `
    <h1 class="mt-5"> Usuarios</h1>
    <hr>

    <table class="table table-striped" id="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">email</th>
                <th scope="col">Nombre</th>
                <th scope="col">Avatar</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    body.appendChild( div );

    tbody = document.querySelector('tbody');
}

const crearFilaUsuario = ({ id, email, firstName, lastName, picture }) => {

    numeracion++;

    const html = `
        <td scope="col"> ${ numeracion }. </td>
        <td scope="col"> ${ email } </td>
        <td scope="col"> ${ firstName } ${ lastName } </td>
        <td scope="col">
            <img class="img-thumbnail" src="${ picture }">
        </td>
        <td scope="col" class="align-middle">
            <button class="btn btn-dark" id="${ id }">Ver perfil</button>
        </td>
    `;

    const tr = document.createElement('tr');
    tr.innerHTML = html;

    tbody.append( tr );

}

const capturarId = async( event ) => {

    if (event.target.tagName == 'BUTTON') {
        dibujarUsuario(await obtenerUnUsuario(event.target.id));
        window.scrollTo(0,0);
    }

}

const dibujarUsuario = ({ firstName, lastName, gender, dateOfBirth, registerDate, email, phone, picture }) => {

    const div = document.querySelector('div');
    div.classList.add('gone');

    dateOfBirth = new Date(dateOfBirth);
    dateOfBirth.toString('Mar 25 2015');

    registerDate = new Date(registerDate);
    registerDate.toString('Mar 25 2015');

    gender = gender == 'male' ? 'Hombre' : 'Mujer';

    const html = `
        <h1 class="mt-5">${ firstName } ${ lastName }</h1>
        <img id="foto" class="img-thumbnail foto" src="${ picture }">
        <hr />
        <p class="fs-5"><b>Género: </b>${ gender }</p>
        <p class="fs-5"><b>Fecha de nacimiento: </b>${ meses[dateOfBirth.getMonth()] } ${ dateOfBirth.getDate() } ${ dateOfBirth.getFullYear() }</p>
        <p class="fs-5"><b>Fecha de registro: </b>${ meses[registerDate.getMonth()] } ${ registerDate.getDate() } ${ registerDate.getFullYear() }</p>
        <p class="fs-5"><b>Correo electrónico: </b>${ email }</p>
        <p class="fs-5"><b>Número telefónico: </b>${ phone }</p>
        <hr>
        <button id="eliminarVista" class="btn btn-dark">Regresar</button>
    `

    const divUsuario = document.createElement('div');
    divUsuario.innerHTML = html;
    divUsuario.id = 'regresar';
    divUsuario.classList.add('text-center');
    body.append( divUsuario );

    btn = document.querySelector( '#eliminarVista' );

    btn.addEventListener('click', () => {

        const divUsuario = document.querySelector('#regresar');
        divUsuario.parentNode.removeChild( divUsuario );

        window.scrollTo(0,0);

        const div = document.querySelector('div');
        div.classList.remove('gone');

    })
    
}

export const init = async() => {

    crearHtml();
    numeracion = 0;

    document.getElementById('table').onclick = capturarId;

    // Obtener la lista de usuarios usando el servicio creado
    // Por cada usuario, llamar la función crearFila
    (await obtenerUsuarios()).forEach( crearFilaUsuario );

}