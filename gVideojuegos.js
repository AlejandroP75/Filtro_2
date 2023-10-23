let aBuscarVid = document.getElementById("aBuscarVid");
let selectOrdVid = document.getElementById("selectOrdVid");
let nueTit = document.getElementById("nueTit");
let nueGen = document.getElementById("nueGen");
let nueVal = document.getElementById("nueVal");
let nuePun = document.getElementById("nuePun");
let listVideojuegos = document.getElementById("listVideojuegos");
let formularioAñadirVid = document.getElementById("formularioAñadirVid");
let videojuegos = [];

class videojuego {
    constructor(id, nombre, genero, valor, puntos){
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.valor = valor;
        this.puntos = puntos;
    }
}

let nueVid1 = new videojuego(1, "Hollow Knight", "Plataformas", "25000", "25");
let nueVid2 = new videojuego(2, "BioShock", "Accion", "50000", "50");
let nueVid3 = new videojuego(3, "Smash Bros", "Peleas", "200000", "200");
let nueVid4 = new videojuego(4, "Phasmofobia", "Terror", "45000", "45");
let nueVid5 = new videojuego(5, "Blur", "Carreras", "50000", "50");
videojuegos.push(nueVid1);
videojuegos.push(nueVid2);
videojuegos.push(nueVid3);
videojuegos.push(nueVid4);
videojuegos.push(nueVid5);

obtenerOrdenSeleccionadoGuardado();
obtenerVideojuegosGuardados();

function obtenerOrdenSeleccionadoGuardado() {
    const ordenGuardado = localStorage.getItem("ordenSeleccionadoVid");
    if (ordenGuardado) {
        selectOrdVid.value = ordenGuardado;
        ordenar();
    }
}   

function obtenerVideojuegosGuardados() {
    const videojuegosGuardados = localStorage.getItem("videojuegos");
    if (videojuegosGuardados) {
        videojuegos = JSON.parse(videojuegosGuardados);
        listar(videojuegos);
    }
}

function listar(array){
    while(listVideojuegos.firstChild){
        listVideojuegos.removeChild(listVideojuegos.firstChild);
    }
    let contenedor = document.createElement("div");
    for(let i = 0; i < array.length; i++){
        let videojuego = document.createElement("li");
        let enlaceVer = document.createElement("a");
        enlaceVer.setAttribute("href", "#openModalVer");
        let botVer = document.createElement("button");
        botVer.setAttribute("onclick", "verModal(" + array[i].id + ")");
        let botEliminar = document.createElement("button");
        botEliminar.setAttribute("onclick", "eliminarVideojuego(" + array[i].id + ")");

        videojuego.innerHTML = "Nombre: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + array[i].nombre + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Genero:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + array[i].genero + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valor:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + array[i].valor;
        botVer.textContent = "Ver mas";
        botEliminar.textContent = "Eliminar";

        enlaceVer.appendChild(botVer);
        contenedor.appendChild(videojuego);
        contenedor.appendChild(enlaceVer);
        contenedor.appendChild(botEliminar);
    }
    listVideojuegos.appendChild(contenedor);
}

function ordenar(){
    if(selectOrdVid.value == "asend"){
        videojuegos.sort(function (a, b) {
            if (a.nombre > b.nombre) {
              return 1;
            }
            if (a.nombre < b.nombre) {
              return -1;
            }
            return 0;
          });
    }else{
        videojuegos.sort(function (a, b) {
            if (a.nombre < b.nombre) {
              return 1;
            }
            if (a.nombre > b.nombre) {
              return -1;
            }
            return 0;
          });
    }
    listar(videojuegos);
}

function buscar(){
    let nuevoArray = [];

    for(let i = 0; i < videojuegos.length; i++){
        if(videojuegos[i].nombre.startsWith(aBuscarVid.value)){
            nuevoArray.push(videojuegos[i]);
        }
    }
    listar(nuevoArray);
}

function registrarVideojuego(){
    if((nueTit.value == "") || (nueGen.value == "") || (nueVal.value == "") || (nuePun.value == "")){
        alert("Por favor rellene todos los campos");
        return
    }
    for(let i = 0; i < videojuegos.length; i++){
        if(nueTit.value == videojuegos[i].nombre){
            alert("Nombre ya registrado");
            return
        }
    }
    let nueVid = new videojuego((videojuegos.length + 1), nueTit.value, nueGen.value, nueVal.value, nuePun.value);
    videojuegos.push(nueVid);
    ordenar();
    guardarVideojuegos();
    formularioAñadirVid.reset();
}

function verModal(id){
    let existeDiv = document.getElementById("openModalVer");
    if (existeDiv) {
        existeDiv.parentNode.removeChild(existeDiv);
    }
    let div = document.createElement("div");
    for(let i = 0; i < videojuegos.length; i++){
        if(id == parseInt(videojuegos[i].id)){
            div.innerHTML = '<div id="openModalVer" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h1>' + videojuegos[i].nombre +'</h1><hr><h2>Genero: '+ videojuegos[i].genero +'</h2><h2>Valor: '+ videojuegos[i].valor +'</h2><h2>Puntos:  '+ videojuegos[i].puntos +'</h2></div></div>';
        }
    }
    listVideojuegos.appendChild(div);
}

function eliminarVideojuego(id){
    for(let i = 0; i < videojuegos.length; i++){
        if(id == videojuegos[i].id){
            videojuegos.splice(i, 1);
        }
    }
    ordenar();
    guardarVideojuegos();
}

function guardarOrdenSeleccionado() {
    localStorage.setItem("ordenSeleccionadoVid", selectOrdVid.value);
}

function guardarVideojuegos() {
    localStorage.setItem("videojuegos", JSON.stringify(videojuegos));
}

aBuscarVid.addEventListener("input", buscar);
selectOrdVid.addEventListener("change", ordenar);
selectOrdVid.addEventListener("change", function () {
    guardarOrdenSeleccionado();
    ordenar();
});
document.addEventListener("DOMContentLoaded", ordenar);
document.addEventListener("DOMContentLoaded", guardarVideojuegos);
