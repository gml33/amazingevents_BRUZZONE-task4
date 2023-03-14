
let categories = "";

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