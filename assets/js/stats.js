import {filtraPorFechaFuturo, filtraPorFechaPasado, upcomingEventsAssistanceRevenues,pastEventsAssistanceRevenues} from './helpers.js';

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
        let pipi = filaUpcomingEvents(upcomingE)
    } catch (error) {
        console.log(error);
    }
}

getData();

const filaUpcomingEvents=(array)=>{
    let filaUpcoming = document.getElementById('upcoming');
    let fila =``;
    for(let i=0;i<array.length;i++){
        fila = fila + `<tr><td>${array.category[i]}</td><td>${array.revenue[i]}</td><td>${array.attendance[i]}</td></tr>`;
    }
    filaUpcoming.appendChild(fila);
}