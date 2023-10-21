let selectBus = document.getElementById("selectBus");
let aBuscar = document.getElementById("aBuscar");
let selectOrd = document.getElementById("selectOrd");
let nueDoc = document.getElementById("nueDoc");
let nueNom = document.getElementById("nueNom");
let nueApe = document.getElementById("nueApe");
let nueTel = document.getElementById("nueTel");
let nueCor = document.getElementById("nueCor");
let nueEdad = document.getElementById("nueEdad");
let nueNacio = document.getElementById("nueNacio");
let botAñadirCli = document.getElementById("botAñadirCli");
let listClientes = document.getElementById("listClientes");
let formularioAñadir = document.getElementById("formularioAñadir")
let clientes = [];

class cliente {
    constructor(documento, nombre, apellido, telefono, correo, edad, nacionalidad){
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.edad = edad;
        this.nacionalidad = nacionalidad;
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
}

nueCli1 = new cliente(1007788706, "Alejandro", "Palacio", 3222039907, "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano");
nueCli2 = new cliente(1007788705, "David", "Pabon", 3112277265, "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano");
nueCli3 = new cliente(1007788703, "Ingrid", "Lopez", 80539155, "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano");
nueCli4 = new cliente(1007788702, "Noel", "Soto", 35417060, "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano");
nueCli5 = new cliente(1007788701, "Camila", "Martinez", 1007788706, "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano");
clientes.push(nueCli1);
clientes.push(nueCli2);
clientes.push(nueCli3);
clientes.push(nueCli4);
clientes.push(nueCli5);

function listar(){

    while(listClientes.firstChild){
        listClientes.removeChild(listClientes.firstChild);
    }

    let contenedor = document.createElement("div");

    for(let i = 0; i < clientes.length; i++){
        let cliente = document.createElement("li");
        let enlaceMod = document.createElement("a");
        enlaceMod.setAttribute("href", "#openModalMod");
        let botModificar = document.createElement("button");
        botModificar.setAttribute("onclick", "modificarModal(" + clientes[i].documento + ")");
        let botEliminar = document.createElement("button");
        botEliminar.setAttribute("onclick", "eliminarCliente()");

        cliente.innerHTML = "Nombre: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + clientes[i].nombre + " " + clientes[i].apellido + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Documento:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + clientes[i].documento;
        botModificar.textContent = "Modificar";
        botEliminar.textContent = "Eliminar";

        enlaceMod.appendChild(botModificar);
        contenedor.appendChild(cliente);
        contenedor.appendChild(enlaceMod);
        contenedor.appendChild(botEliminar);
    }
    listClientes.appendChild(contenedor);
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
    nueCli = new cliente(nueDoc.value, nueNom.value, nueApe.value, nueTel.value, nueCor.value, nueEdad.value, nueNacio.value);
    clientes.push(nueCli);
    listar();
    formularioAñadir.reset();
}

function modificarModal(documento){
    let existeDiv = document.getElementById("openModalMod");
    if (existeDiv) {
        existeDiv.parentNode.removeChild(existeDiv);
    }
    let div = document.createElement("div");
    for(let i = 0; i < clientes.length; i++){
        if( documento == parseInt(clientes[i].documento)){
            div.innerHTML = '<div id="openModalMod" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h1>Modificar cliente</h1><hr><form id="formularioModificar"><label for="modDoc">Numero de documento: </label><input type="number" id="modDoc" value="'+ clientes[i].documento +'"><br><label for="modNom">Nombre: </label><input type="text" id="modNom" value="'+ clientes[i].nombre +'"><br><label for="modApe">Apellido: </label><input type="text" id="modApe" value="'+ clientes[i].apellido +'"><br><label for="modTel">Telefono: </label><input type="number" id="modTel" value="'+ clientes[i].telefono +'"><br><label for="modCor">Correo electronico: </label><input type="email" id="modCor" value="'+ clientes[i].correo +'"><br><label for="modEdad">Fecha de nacimiento: </label><input type="date" id="modEdad" value="'+ clientes[i].edad +'"><br><label for="modNacio">Pais de nacimiento: </label><input type="text" id="modNacio" value="'+ clientes[i].nacionalidad +'"></form><a><button id="botModificarCli" onclick="modificarCliente('+ documento +')">Enviar</button></a></div></div>';
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
        var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if(!regex.test(modCor.value)){
            alert("Ingrese un correo valido");
            return
        }
        if(documento == clientes[i].documento){
            clientes[i].modificar(modDoc.value, modNom.value, modApe.value, modTel.value, modCor.value, modEdad.value, modNacio.value);
        }
    }
    listar();
}

function eliminarCliente(){
    console.log("this is another test");
}

document.addEventListener("DOMContentLoaded", listar);