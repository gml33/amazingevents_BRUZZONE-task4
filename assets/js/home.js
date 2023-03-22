const { createApp } = Vue;
const apiUrl = "../../assets/js/amazing.json";
const app = createApp({
    data() {
        return {
        eventos: [],
        categorias: [],
        eventosFiltrados: [],
        valorBusqueda: "",
        checked: [],
        evento: undefined,
        titulo: "",
        };
    },
    created() {
        this.getData();        
    },
    methods: {
        async getData() {
        try {
            const response = await fetch(apiUrl);
            let data = await response.json();
            if (document.title.includes("Details")) {
                let aux = location.search;
                let params = new URLSearchParams(aux);
                let id = params.get("id");
                this.evento = data.find((evento) => evento.id === id);
                this.titulo = this.evento.name;
            } else {
                if(document.title.includes("Upcoming")){
                    this.eventos = data.events.filter(e=>e.estimate)
                }
                else if(document.title.includes("Past")){
                    this.eventos = data.events.filter(e=>e.assistance)
                }
                else{
                    this.eventos = data.events;
                }                
                this.eventosFiltrados=this.eventos;
                this.categorias = [ ...new Set(this.eventos.map( e=>e.category )) ]
            }
            //return data;
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        filtro() {
            console.log(this.checked);
            this.eventosFiltrados = this.eventos.filter((evento) =>(
                this.checked.includes(evento.category) || this.checked.length === 0) && evento.name.toLowerCase().includes(this.valorBusqueda.toLowerCase())
                );
            },
        },
    });
app.mount("#app");