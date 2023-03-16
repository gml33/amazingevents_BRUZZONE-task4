import { crearCards, crearCheckBoxes, createCategories, filtroArray, mensaje, filtraPorFechaFuturo} from './helpers.js';

let data = [];

async function getData(){
  try {
    const apiUrl = '/assets/js/amazing.json';
    const response = await fetch(apiUrl);
    data = await response.json();    
    data = filtraPorFechaFuturo(data);
    let categorias = createCategories(data);
    crearCheckBoxes(categorias, containerCheckBoxes); // Imprimo los radios de categorías
    crearCards(data,containerCard);//cargo por primera vez las cards
  } catch (error) {
    console.log(error);
  }
}

getData();


/*agregar un eventListener a cada checkbox y obtengo su estado*/
let datos = []
containerCheckBoxes.addEventListener('change',()=>{
let elementos=[]
let listaChecked = document.querySelectorAll('input[name="category"]:checked')
listaChecked.forEach((item)=>{
  elementos.push(item.defaultValue)
  })
  if(elementos.length==0){
    crearCards([],containerCard);
    crearCards(data,containerCard);
  }
  else{
    crearCards([],containerCard);
    datos = filtroArray(data, elementos)
    crearCards(datos, containerCard)      
  }
})

/*agregar un eventListener a la busqueda asi se filtra por categoria*/
let buscador = document.querySelector('input[placeholder="Search"]')
buscador.addEventListener('input',()=>{
  let datafiltrada = [];
  let elementos=[];
  let listaChecked = [];
  let datos = data;
  listaChecked = document.querySelectorAll('input[name="category"]:checked')  
  listaChecked.forEach((item)=>{    
    elementos.push(item.defaultValue)
  })
  if(listaChecked.length>0){
    datos = filtroArray(data, elementos)
  }
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