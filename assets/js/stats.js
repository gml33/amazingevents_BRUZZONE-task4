import {detalleEvento} from './helpers.js';

let data = [];

const queryString = location.search
const params = new URLSearchParams(queryString)
const eventID = params.get('id')

async function getData(){
    try {
        const apiUrl = '/assets/js/amazing.json';
        const response = await fetch(apiUrl);
        data = await response.json();
        let event = data.events.find( element => element._id == eventID )
        detalleEvento(event, eventDetail)        
    } catch (error) {
        console.log(error);
    }
}
getData();