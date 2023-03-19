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
        //hasta aca bien, filtra los eventos por upcoming y past
        let ganancias=eventosFiltradosPorCategorias(upcomingEvents)

    } catch (error) {
        console.log(error);
    }
}

getData();

let eventosFiltradosPorCategorias=(arrayEventos)=>{
    let values = {};
    let categorias = [];
    let i = 0;
    let j=0;
    let monto = 0;
    //itero sobre el array de eventos para obtener las categorias
    arrayEventos.forEach((evento)=>{
        let categoriaEvento = evento.category;
        categorias.push(categoriaEvento);
    });
    //hago un set sobre el resultado, para eliminar duplicados
    categorias = new Set(categorias)
    //transformo un set en un array
    categorias = [...categorias]
    //itero sobre el array de las categorias
    for(i=0;i<categorias.length;i++){
        //inicializo la variable del monto        
        monto= 0;
        //itero sobre el array de eventos
        for(j=0;j<arrayEventos.length;j++){
            //si el category del evento es igual a la categoriia del primer loop, agrgo el valor del monto multiplicado por la asistencia
            //pero los malditos eventos no estan normalizados, por lo que a veces vienen sin todos los datos, principalmente de asistencia
            //asi que le voy a meter un puto if aca para comprobar que vengan bien, porque despues de casi 2 dias de que esta mierda falle, me di cuenta que al no estar 
            //normalizados los datos, me arrojaba un valor nulo cuando no detectaba la asistencia. LPM
            //casi prendo fuego mi computadora de la bronca que me agarró, asi que antes de seguir, me voy a tomar un buen tereré y mientras me tranquilizo mirando al al 
            //cielo, voy a regar mis plantas, me voy a bañar y quizas después siga.......
            if(arrayEventos[j].category && arrayEventos[j].price && arrayEventos[j].assistance){
                if(categorias[i]==arrayEventos[j].category){                   
                    monto = monto+arrayEventos[j].price*arrayEventos[j].assistance;
                }
            }else{
                //fuck off
            }            
        }             
        values[i] = {'categoria':categorias[i],'monto':monto};
    }
    console.log(values);
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