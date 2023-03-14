import data from "./data.js"

/*funcion para crear las crearCards desde el array que le mande*/
let fragmento = document.createDocumentFragment();
function crearCards(array, containerCard){
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

/*Cargo por primera vez las crearCards con todos los datos*/
crearCards(data.events,containerCard);

/*funcion para crear las categorias de los checkboxes desde el Json*/
function createCategories(array){
let items = [];
array.forEach((categoria)=>{
  if(!items.includes(categoria.category)){
    items.push(categoria.category);
  }   
})
return items;
}

/*funcion para crear los checkboxes desde las categorias recien obtenidas*/
let fragmento1 = document.createDocumentFragment();
function crearCheckBoxes(array, containerCheckBoxes){
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
function filtroArray(array, filtro){
  let dataFinal=[];
  array.forEach((evento)=>{
    filtro.forEach((categoria)=>{      
      if(evento.category==categoria){
        dataFinal.push(evento)
      }
    })
  })
  return dataFinal;
  }

  /*Inicio los checkboxes*/
crearCheckBoxes(createCategories(data.events), containerCheckBoxes)



  /*agregar un eventListener a cada checkbox y obtengo su estado*/
let checkBoxes = document.querySelectorAll('input[name="category"]')
let datos = []
checkBoxes.forEach((checkbox)=>{
  checkbox.addEventListener('change',()=>{
    let elementos=[]
    let listaChecked = document.querySelectorAll('input[name="category"]:checked')
    listaChecked.forEach((item)=>{
      elementos.push(item.defaultValue)
    })
    if(elementos.length==0){
      crearCards([],containerCard);
      crearCards(data.events,containerCard);
    }
    else{
      crearCards([],containerCard);
      datos = filtroArray(data.events, elementos)
      crearCards(datos, containerCard)      
    }
  })
})


/*Inicializo el filtroArray con todas las categorias*/
/*filtroArray(data.events, createCategories(data.events))*/


  /*hasta aca esta ok*/

/*Funcion para mostrar un mensaje cuando la busqueda no arroja resultados*/
let fragmento2 = document.createDocumentFragment();
function mensaje(containerCard){
  let div = document.createElement("div");
  div.className = "no_hay_un_porongo"
  div.innerHTML += `<h1>Nada que ver lo que estas buscando</h1>`
  fragmento2.appendChild(div);
  containerCard.appendChild(fragmento2);
}




/*agregar un eventListener a la busqueda asi se filtra por categoria*/
let buscador = document.querySelector('input[placeholder="Search"]')
buscador.addEventListener('input',()=>{
  let datafiltrada = [];
  let elementos=[];
  let listaChecked = [];
  let datos = data.events;
  listaChecked = document.querySelectorAll('input[name="category"]:checked')  
  listaChecked.forEach((item)=>{    
    elementos.push(item.defaultValue)
  })
  if(listaChecked.length>0){
    datos = filtroArray(data.events, elementos)
  }
  console.log(datos);
  datos.forEach(element => {    
    if(element.name.toLowerCase().includes(buscador.value.toLowerCase())){
      datafiltrada.push(element);
    }
  })  
  if(datafiltrada.length==0){
    /*Mostrar tarjeta o mensaje que no hay un carajo*/
    crearCards([],containerCard);
    mensaje(containerCard)
  }else{    
    crearCards(datafiltrada,containerCard);
  }
});

/*Arreglar el buscasor para que busque sin tener checkboxes activos.*/