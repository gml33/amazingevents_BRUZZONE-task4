import data from './data.js'

const queryString = location.search
const params = new URLSearchParams(queryString)
const eventID = params.get('id')
const event = data.events.find( element => element._id == eventID )



let fragmento = document.createDocumentFragment();
function detalleEvento(array, containerEvento){
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
    fragmento.appendChild(div)
    containerEvento.appendChild(fragmento);
}
    
detalleEvento(event, eventDetail)

