
let categories = "";
let array = {};
let event = {};

/*Funcion para filtrar los eventos segun la fecha*/
export const filtraPorFechaPasado=(array)=>{
    let fecha_actual = new Date('2023,03,19');
    let eventosPasado=[]
    array.events.forEach((evento)=>{
        let anno_evento = evento.date.split('-')[0]
        let mes_evento = evento.date.split('-')[1]
        let dia_evento = evento.date.split('-')[2]
        let fecha_evento = new Date(anno_evento, mes_evento, dia_evento)
        if(fecha_evento.getTime()<fecha_actual.getTime()){
            eventosPasado.push(evento)
        }
    })
    return eventosPasado
}

/*Funcion para filtrar los eventos segun la fecha*/
export const filtraPorFechaFuturo=(array)=>{
    let fecha_actual = new Date('2022,01,01');
    let eventosFuturo=[]
    array.events.forEach((evento)=>{
        let anno_evento = evento.date.split('-')[0]
        let mes_evento = evento.date.split('-')[1]
        let dia_evento = evento.date.split('-')[2]
        let fecha_evento = new Date(anno_evento, mes_evento, dia_evento)
        if(fecha_evento.getTime()>fecha_actual.getTime()){
            eventosFuturo.push(evento)
        }
    })
    return eventosFuturo
}

/*funcion para crear las categorias de los checkboxes desde el Json*/
export const createCategories = (array)=>{
    let items = [];
    array.forEach((categoria)=>{
        if(!items.includes(categoria.category)){
            items.push(categoria.category);
        }   
    })
    return items;
}

/*funcion para crear las crearCards desde el array que le mande*/
let fragmento = document.createDocumentFragment();
export const crearCards = (array, containerCard)=>{
    containerCard.innerHTML=''
    array.forEach((evento)=>{
        let div = document.createElement("div");
        div.className = "tarjeta"
        div.id = `${evento._id}`
        div.innerHTML += `<div class="img_tarjeta ad" style="background-image: url(${evento.image})" >
                        </div>
                        <div class="cuerpo_tarjeta">
                            <h3>${evento.name}</h3>
                            <p>${evento.description}</p>
                            <div class="precio_tarjeta">
                                <p>Price: ${evento.price}U$D</p>
                                <div class="boton_tarjeta">
                                    <a class="btn btn-primary" href="../../pages/details.html?id=${evento._id}">More</a>
                                </div>
                            </div>                    
                        </div>
                        </div>`
        fragmento.appendChild(div);
    })
    containerCard.appendChild(fragmento);
}


/*funcion para crear los checkboxes desde las categorias recien obtenidas*/
let fragmento1 = document.createDocumentFragment();
export const crearCheckBoxes = (array, containerCheckBoxes)=>{
    let i = 0;
    array.forEach((categoria)=>{
        let div = document.createElement("div");
        div.className = "form-check"
        div.innerHTML += `<input class="form-check-input" type="checkbox" name="category" value="${categoria}" id="flexCheckDefault${i}">
                        <label class="form-check-label" for="flexCheckDefault${i}">${categoria}</label>`
        fragmento1.appendChild(div);
        i++;
    })
    containerCheckBoxes.appendChild(fragmento1);
}

/*Creo una funcion que filtra la data segun los checkboxes activos*/
export const filtroArray = (array, filtro)=>{
    let dataFinal=[];
    array.forEach((evento)=>{
        filtro.forEach((categoria)=>{      
            if(evento.category==categoria){
                dataFinal.push(evento);
            }
        })
    })
    return dataFinal;
}

/*Funcion para mostrar un mensaje cuando la busqueda no arroja resultados*/
let fragmento2 = document.createDocumentFragment();
export const mensaje = (containerCard)=>{
    let div = document.createElement("div");
    div.className = "no_hay_un_porongo"
    div.innerHTML += `<h1>Nada que ver lo que estas buscando</h1>`
    fragmento2.appendChild(div);
    containerCard.appendChild(fragmento2);
}

let fragmento3 = document.createDocumentFragment();
export const detalleEvento=(event, containerEvento)=>{    
    containerEvento.innerHTML=''
    let div = document.createElement("div");
    div.className = "detalle"
    div.innerHTML += `<div class="imagen_detalle">
                        <img src="${event.image}" alt="Detalle Evento">
                    </div>
                    <div class="detalle_evento">
                        <h2>${event.name}</h2>
                        <p>Date: ${event.date}</p>
                        <p>${event.description}</p>
                        <p>Category: ${event.category}</p>
                        <p>Place: ${event.place}</p>
                        <p>Capacity: ${event.capacity} people</p>
                        <p>Estimate: ${event.estimate}</p>
                        <p>Price: ${event.price}U$D</p>
                    </div>`
    fragmento3.appendChild(div)
    containerEvento.appendChild(fragmento3);
}

export const upcomingEventsAssistanceRevenues=(arrayEventos)=>{
    let values = {};
    let categorias = [];
    let i = 0;
    let j=0;
    let monto = 0;
    let estimado = 0;
    let capacidad = 0;
    let attendance = 0;
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
        monto = 0;
        attendance = 0;
        capacidad = 0;
        estimado = 0;
        //itero sobre el array de eventos
        for(j=0;j<arrayEventos.length;j++){           
            if(arrayEventos[j].category && arrayEventos[j].price && arrayEventos[j].estimate && arrayEventos[j].capacity){
                if(categorias[i]==arrayEventos[j].category){                                   
                    estimado = estimado + arrayEventos[j].estimate;
                    monto = monto+arrayEventos[j].price*arrayEventos[j].estimate;
                    capacidad = capacidad + arrayEventos[j].capacity;
                }
            }            
        }
        attendance = 100*(estimado/capacidad);
        values[i] = {'category':categorias[i],'revenue':monto, 'attendance':attendance};
    }
    return values
}


export const pastEventsAssistanceRevenues=(arrayEventos)=>{
    let values = {};
    let categorias = [];
    let i = 0;
    let j=0;
    let monto = 0;
    let asistencia = 0;
    let capacidad = 0;
    let attendance = 0;
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
        monto = 0;
        asistencia = 0;
        capacidad = 0;
        //itero sobre el array de eventos
        for(j=0;j<arrayEventos.length;j++){
            //si el category del evento es igual a la categoriia del primer loop, agrego el valor del monto multiplicado por la asistencia
            //pero los malditos eventos no estan normalizados, por lo que a veces vienen sin todos los datos, principalmente de asistencia
            //asi que le voy a meter un puto if aca para comprobar que vengan bien, porque despues de casi 2 dias de que esta mierda falle, me di cuenta que al no estar 
            //normalizados los datos, me arrojaba un valor nulo cuando no detectaba la asistencia. LPM
            //casi prendo fuego mi computadora de la bronca que me agarró, asi que antes de seguir, me voy a tomar un buen tereré y mientras me tranquilizo mirando al
            //cielo y tirándole alguna naranja a algún borracho o linyera, voy a regar mis plantas, me voy a bañar y quizas después siga.......
            if(arrayEventos[j].category && arrayEventos[j].price && arrayEventos[j].assistance && arrayEventos[j].capacity){
                if(categorias[i]==arrayEventos[j].category){                   
                    monto = monto+arrayEventos[j].price*arrayEventos[j].assistance;
                    asistencia = asistencia + arrayEventos[j].assistance;
                    capacidad = capacidad + arrayEventos[j].capacity;
                }
            }            
        }
        attendance = 100*(asistencia/capacidad);
        values[i] = {'category':categorias[i],'revenue':monto, 'attendance':attendance};
    }
    return values
}


const fragment7 = document.createDocumentFragment();
export const tabla =(array, container)=>{
    container.innerHTML = ""
    const pepito = Object.entries(array)
    for(let i=0;i<pepito.length;i++){
        let tr = document.createElement('tr');
        tr.className='tabla'
        tr.innerHTML = `<td>${array[i].category}</td><td>${array[i].revenue}</td><td>${array[i].attendance}</td>`
        fragment7.appendChild(tr)
    }
    container.appendChild(fragment7)
}


