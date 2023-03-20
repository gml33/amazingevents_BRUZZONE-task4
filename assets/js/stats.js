import {filtraPorFechaFuturo, filtraPorFechaPasado, upcomingEventsAssistanceRevenues,pastEventsAssistanceRevenues, tabla} from './helpers.js';
const $tabla1 = document.getElementById('tablaUpcomingEvents');
const $tabla2 = document.getElementById('tablaPastEvents');

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
    } catch (error) {
        console.log(error);
    }
}

getData();