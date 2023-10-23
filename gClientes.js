let aBuscarCli = document.getElementById("aBuscarCli");
let selectOrd = document.getElementById("selectOrdCli");
let nueDoc = document.getElementById("nueDoc");
let nueNom = document.getElementById("nueNom");
let nueApe = document.getElementById("nueApe");
let nueTel = document.getElementById("nueTel");
let nueCor = document.getElementById("nueCor");
let nueEdad = document.getElementById("nueEdad");
let nueNacio = document.getElementById("nueNacio");
let listClientes = document.getElementById("listClientes");
let formularioAñadirCli = document.getElementById("formularioAñadirCli");
let clientes = []

class cliente {
    constructor(documento, nombre, apellido, telefono, correo, edad, nacionalidad, puntos){
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.edad = edad;
        this.nacionalidad = nacionalidad;
        this.puntos = puntos;
    }
    modificar(documento, nombre, apellido, telefono, correo, edad, nacionalidad){
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.edad = edad;
        this.nacionalidad = nacionalidad;
    }
    static fromJSON(json) {
        const { documento, nombre, apellido, telefono, correo, edad, nacionalidad, puntos } = JSON.parse(json);
        return new cliente(documento, nombre, apellido, telefono, correo, edad, nacionalidad, puntos);
    }
}

let nueCli1 = new cliente("1007788706", "Alejandro", "Palacio", "3222039907", "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano", 0);
let nueCli2 = new cliente("2007788705", "David", "Pabon", "3112277265", "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano", 0);
let nueCli3 = new cliente("37788703", "Ingrid", "Lopez", "80539155", "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano", 0);
let nueCli4 = new cliente("8007788702", "Alejo", "Soto", "35417060", "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano", 0);
let nueCli5 = new cliente("9000007788701", "Camila", "Martinez", "1007788706", "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano", 0);
clientes.push(nueCli1);
clientes.push(nueCli2);
clientes.push(nueCli3);
clientes.push(nueCli4);
clientes.push(nueCli5);

obtenerOrdenSeleccionadoGuardado();
obtenerClientesGuardados();

function obtenerOrdenSeleccionadoGuardado() {
    const ordenGuardado = localStorage.getItem("ordenSeleccionadoCli");
    if (ordenGuardado) {
        selectOrd.value = ordenGuardado;
        ordenar();
    }
}

function obtenerClientesGuardados() {
    const clientesGuardados = localStorage.getItem("clientes");
    if (clientesGuardados) {
        const clientesJSON = JSON.parse(clientesGuardados);
        clientes = clientesJSON.map(json => {
            return new cliente(
                json.documento,
                json.nombre,
                json.apellido,
                json.telefono,
                json.correo,
                json.edad,
                json.nacionalidad,
                json.puntos
            );
        });
        listar(clientes);
    }
}


function listar(array){
    while(listClientes.firstChild){
        listClientes.removeChild(listClientes.firstChild);
    }
    let contenedor = document.createElement("div");
    for(let i = 0; i < array.length; i++){
        let cliente = document.createElement("li");
        cliente.setAttribute("class", "contCliente");
        let enlaceMod = document.createElement("a");
        enlaceMod.setAttribute("href", "#openModalMod");
        let botModificar = document.createElement("button");
        botModificar.setAttribute("onclick", "modificarModal(" + array[i].documento + ")");
        let botEliminar = document.createElement("button");
        botEliminar.setAttribute("onclick", "eliminarCliente(" + array[i].documento + ")");
        let ordenar = document.createElement("div");

        cliente.innerHTML = "<strong>Nom:</strong>" + array[i].nombre + " " + array[i].apellido + "<strong>Doc:</strong>" + array[i].documento+ "<strong>Tel:</strong>" + array[i].telefono+ "<strong>Correo:</strong>" + array[i].correo+ "<strong>Nacimiento:</strong>" + array[i].edad+ "<strong>Nacionalidad:</strong>" + array[i].nacionalidad;
        botModificar.textContent = "Modificar";
        botEliminar.textContent = "Eliminar";

        ordenar.appendChild(enlaceMod);
        ordenar.appendChild(botEliminar);
        enlaceMod.appendChild(botModificar);
        cliente.appendChild(ordenar);
        contenedor.appendChild(cliente);
    }
    listClientes.appendChild(contenedor);
}

function ordenar(){
    if(selectOrd.value == "asend"){
        clientes.sort(function (a, b) {
            if (a.nombre > b.nombre) {
              return 1;
            }
            if (a.nombre < b.nombre) {
              return -1;
            }
            return 0;
          });
    }else{
        clientes.sort(function (a, b) {
            if (a.nombre < b.nombre) {
              return 1;
            }
            if (a.nombre > b.nombre) {
              return -1;
            }
            return 0;
          });
    }
    listar(clientes);
}

function buscar(){
    let nuevoArray = [];

    for(let i = 0; i < clientes.length; i++){
        if(clientes[i].nombre.startsWith(aBuscarCli.value)){
            nuevoArray.push(clientes[i]);
        }else if(clientes[i].apellido.startsWith(aBuscarCli.value)){
            nuevoArray.push(clientes[i]);
        }else if(clientes[i].documento.startsWith(aBuscarCli.value)){
            nuevoArray.push(clientes[i]);
        }
    }
    listar(nuevoArray);
}

function registrarCliente(){
    if((nueDoc.value == "") || (nueNom.value == "") || (nueApe.value == "") || (nueTel.value == "") || (nueCor.value == "") || (nueEdad.value == "") || (nueNacio.value == "")){
        alert("Por favor rellene todos los campos");
        return
    }
    for(let i = 0; i < clientes.length; i++){
        if(nueDoc.value == clientes[i].documento){
            alert("Numero de documento ya registrado");
            return
        }
        if(nueTel.value == clientes[i].telefono){
            alert("Numero de telefono ya registrado");
            return
        }
        var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if(!regex.test(nueCor.value)){
            alert("Ingrese un correo valido");
            return
        }
        if(nueCor.value == clientes[i].correo){
            alert("Correo electronico ya registrado");
            return
        }
    }
    let nueCli = new cliente(nueDoc.value, nueNom.value, nueApe.value, nueTel.value, nueCor.value, nueEdad.value, nueNacio.value, 0);
    clientes.push(nueCli);
    ordenar();
    guardarClientes();
    formularioAñadirCli.reset();
}

function modificarModal(documento){
    let existeDiv = document.getElementById("openModalMod");
    if (existeDiv) {
        existeDiv.parentNode.removeChild(existeDiv);
    }
    let div = document.createElement("div");
    for(let i = 0; i < clientes.length; i++){
        if( documento == parseInt(clientes[i].documento)){
            div.innerHTML = '<div id="openModalMod" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h1 class="tituloModal">Modificar cliente</h1><hr><form id="formularioModificar"><div class="espForm"><label for="modDoc">Numero de documento: </label><input type="number" id="modDoc" value="'+ clientes[i].documento +'"></div><div class="espForm"><label for="modNom">Nombre: </label><input type="text" id="modNom" value="'+ clientes[i].nombre +'"></div><div class="espForm"><label for="modApe">Apellido: </label><input type="text" id="modApe" value="'+ clientes[i].apellido +'"></div><div class="espForm"><label for="modTel">Telefono: </label><input type="number" id="modTel" value="'+ clientes[i].telefono +'"></div><div class="espForm"><label for="modCor">Correo electronico: </label><input type="email" id="modCor" value="'+ clientes[i].correo +'"></div><div class="espForm"><label for="modEdad">Fecha de nacimiento: </label><input type="date" id="modEdad" value="'+ clientes[i].edad +'"></div><div class="espForm"><label for="modNacio">Pais de nacimiento: </label><input type="text" id="modNacio" value="'+ clientes[i].nacionalidad +'"></div></form><a><button id="botModificarCli" onclick="modificarCliente('+ documento +')">Enviar</button></a></div></div>';
        }
    }
    listClientes.appendChild(div);
}

function modificarCliente(documento){
    let modDoc = document.getElementById("modDoc");
    let modNom = document.getElementById("modNom");
    let modApe = document.getElementById("modApe");
    let modTel = document.getElementById("modTel");
    let modCor = document.getElementById("modCor");
    let modEdad = document.getElementById("modEdad");
    let modNacio = document.getElementById("modNacio");

    if((modDoc.value == "") || (modNom.value == "") || (modApe.value == "") || (modTel.value == "") || (modCor.value == "") || (modEdad.value == "") || (modNacio.value == "")){
        alert("Por favor rellene todos los campos");
        return
    }

    for(let i = 0; i < clientes.length; i++){
        if(modDoc.value == clientes[i].documento && clientes[i].documento != documento){
            alert("Numero de documento ya registrado");
            return
        }
    }
    var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(!regex.test(modCor.value)){
        alert("Ingrese un correo valido");
        return
    }
    for(let i = 0; i < clientes.length; i++){
        if(documento == clientes[i].documento){
            documento = modDoc.value;
            clientes[i].modificar(modDoc.value, modNom.value, modApe.value, modTel.value, modCor.value, modEdad.value, modNacio.value);
            
        }
    }
    ordenar();
    guardarClientes();
}

function eliminarCliente(documento){
    for(let i = 0; i < clientes.length; i++){
        if(documento == clientes[i].documento){
            clientes.splice(i, 1);
        }
    }
    ordenar();
    guardarClientes();
}

function guardarOrdenSeleccionado() {
    localStorage.setItem("ordenSeleccionadoCli", selectOrd.value);
}

function guardarClientes() {
    const clientesJSON = clientes.map(cliente => ({
        documento: cliente.documento,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        telefono: cliente.telefono,
        correo: cliente.correo,
        edad: cliente.edad,
        nacionalidad: cliente.nacionalidad,
        puntos: cliente.puntos
    }));
    localStorage.setItem("clientes", JSON.stringify(clientesJSON));
}

aBuscarCli.addEventListener("input", buscar);
selectOrd.addEventListener("change", ordenar);
selectOrd.addEventListener("change", function () {
    guardarOrdenSeleccionado();
    ordenar();
});
document.addEventListener("DOMContentLoaded", ordenar);
document.addEventListener("DOMContentLoaded", guardarClientes);