import {filtraPorFechaFuturo, filtraPorFechaPasado, upcomingEventsAssistanceRevenues,pastEventsAssistanceRevenues, tabla} from './helpers.js';
const $tabla1 = document.getElementById('tablaUpcomingEvents');
const $tabla2 = document.getElementById('tablaPastEvents');
const $tabla3 = document.getElementById('tabla3');

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
        let upcomingE=upcomingEventsAssistanceRevenues(upcomingEvents)
        let pastEvents = filtraPorFechaPasado(data);
        let pastE = pastEventsAssistanceRevenues(pastEvents)
        tabla(upcomingE, $tabla1)
        tabla(pastE, $tabla2)
        tabla_info(data, $tabla3)
        console.log(mayorAsistencia(data.events));
        console.log(menorAsistencia(data.events));
        console.log(mayorCapacidad(data.events));
        mayorAsistencia(data.events)
        menorAsistencia(data.events)
        mayorCapacidad(data.events)

    } catch (error) {
        console.log(error);
    }
}

getData();

const mayorAsistencia = (array)=>{
    let greatestAttendance = {name:'', attendance:0};    
    for(let i=0;i<array.length;i++){
        let attendance =0;
        if(array[i].assistance && array[i].name){
            attendance = 100*(array[i].assistance/array[i].capacity);
            //armo el de mayor asistencia
            if(attendance>greatestAttendance.attendance){
                greatestAttendance.name=array[i].name;
                greatestAttendance.attendance=attendance;
            }
        }
    }
    return greatestAttendance
}

const menorAsistencia = (array)=>{
    let lowestAttendance = {name:'', attendance:10000};    
    for(let i=0;i<array.length;i++){
        let attendance =0;
        if(array[i].assistance && array[i].name){
            attendance = 100*(array[i].assistance/array[i].capacity);
            //armo el de menor asistencia
            if(attendance<lowestAttendance.attendance){
                lowestAttendance.name=array[i].name;
                lowestAttendance.attendance=attendance;
            }
        }
    }
    return lowestAttendance
}

const mayorCapacidad = (array)=>{
    let greatestCapacity = {name:'', capacity:0};    
    for(let i=0;i<array.length;i++){
        let capacity =0;
        if(array[i].capacity && array[i].name){
            capacity = array[i].capacity
            if(capacity>greatestCapacity.capacity){
                greatestCapacity.name=array[i].name;
                greatestCapacity.capacity=capacity;
            }
        }
    }
    return greatestCapacity
}

const fragment8 = document.createDocumentFragment();
const tabla_info =(array, container)=>{
    let mayorasistencia = mayorAsistencia(array.events)
    let menorasistencia = menorAsistencia(array.events)
    let mayorcapacidad = mayorCapacidad(array.events)
    container.innerHTML = ""
    let tr = document.createElement('tr');
    tr.className='tabla3'
    tr.innerHTML = `<td>${mayorasistencia.name}</td><td>${menorasistencia.name}</td><td>${mayorcapacidad.name}</td>`
    fragment8.appendChild(tr)   
    container.appendChild(fragment8)
}