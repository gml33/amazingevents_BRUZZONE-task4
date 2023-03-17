import {filtraPorFechaFuturo, detalleEvento, filtraPorFechaPasado} from './helpers.js';

let data = [];

const queryString = location.search
const params = new URLSearchParams(queryString)
const eventID = params.get('id')

async function getData(){
    try {
        const apiUrl = '/assets/js/amazing.json';
        const response = await fetch(apiUrl);
        data = await response.json();        
        let upcomingEvents = filtraPorFechaFuturo(data);
        let pastEvents = filtraPorFechaPasado(data);
        console.log(pastEvents);
        let upcomingCategories = obtenerCategorias(upcomingEvents);
        let pastCategories = obtenerCategorias(pastEvents)
        //let ganancia1 = obtenerGananciaPorCategoria(upcomingEvents, upcomingCategories[0])
        let ganancia2 = obtenerGananciaPorCategoria(pastEvents, pastCategories[1])
        //console.log('ganancia upcoming: '+ganancia1);
        console.log('ganancia past: '+ganancia2);
    } catch (error) {
        console.log(error);
    }
}

getData();

//upcomingEvents>categories>revenues>percentajeOfAssistance
let obtenerCategorias =(array)=>{
    let categorias = [];
    array.forEach((evento)=>{
        let categoriaEvento = evento.category;
        categorias.push(categoriaEvento);        
    });
    categorias = new Set(categorias)
    categorias = [...categorias]
    return categorias;
}

let obtenerEventosPorCategoria = (eventos, categorias)=>{
    let eventosPorCategoria = {};
    eventos.forEach(()=>{
        if(evento.category.tolowercase() == categoria.tolowercase()){
            eventosPorCategoria.push(evento);
        }
    });
    return eventosPorCategoria;
}

let obtenerGananciaPorCategoria=(eventos, categoria)=>{
    let ganancia = 0;
    eventos.forEach((evento)=>{
        if(evento.category == categoria){
            console.log(evento._id);
            console.log('precio: '+evento.price);
            console.log('asistencia:' +evento.assistance);
            ganancia = ganancia + evento.price*evento.assistance;
            console.log(ganancia);
        }
    });
    console.log('categoria: '+categoria+'. ganancia: '+ganancia);
    return ganancia;
}

let fragmento4 = document.createDocumentFragment();
export const statistics=(event, containerEvento)=>{    
    containerEvento.innerHTML=''
    let div = document.createElement("div");
    div.className = "detalle"
    div.innerHTML += `<table class="table caption-top table-bordered">
    <caption>
        Events Statistics
    </caption>
    <thead>
        <tr>
            <th scope="col">Events with the highest percentage of attendance</th>
            <th scope="col">Events with the lowest percentage of attendance</th>
            <th scope="col">Events with larger capacity</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
<table class="table caption-top table-bordered">
    <caption>Upcoming Events statistics by category</caption>
    <thead>
        <tr>
            <th scope="col">Categories</th>
            <th scope="col">Revenues</th>
            <th scope="col">Percentage of attendance</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
<table class="table caption-top table-bordered">
    <caption>Past Events statistics by category</caption>
    <thead>
        <tr>
            <th scope="col">Categories</th>
            <th scope="col">Revenues</th>
            <th scope="col">Percentage of attendance</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>`

    fragmento4.appendChild(div)
    containerEvento.appendChild(fragmento4);
}

//pastEvents>categories>revenues>percentajeOfAssistance