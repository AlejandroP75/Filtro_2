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
}

nueCli1 = new cliente(1007788706, "Alejandro", "Palacio", 3222039907, "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano");
nueCli2 = new cliente(1007788705, "David", "Pabon", 3222039907, "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano");
nueCli3 = new cliente(1007788703, "Ingrid", "Lopez", 3222039907, "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano");
nueCli4 = new cliente(1007788702, "Noel", "Soto", 3222039907, "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano");
nueCli5 = new cliente(1007788701, "Camila", "Martinez", 3222039907, "diego_palacio5@hotmail.com", "2001-01-11", "Colombiano");
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
        botModificar.setAttribute("onclick", "modificarCliente()");
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

function modificarCliente(){
    let div = document.createElement("div");
    div.innerHTML = '<div id="openModalMod" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h1>Modificar cliente</h1><hr><form id="formularioAñadir"><label for="nueDoc">Numero de documento: </label><input type="number" id="nueDoc"><br><label for="nueNom">Nombre: </label><input type="text" id="nueNom"><br><label for="nueApe">Apellido: </label><input type="text" id="nueApe"><br><label for="nueTel">Telefono: </label><input type="number" id="nueTel"><br><label for="nueCor">Correo electronico: </label><input type="email" id="nueCor"><br><label for="nueEdad">Fecha de nacimiento: </label><input type="date" id="nueEdad"><br><label for="nueNacio">Pais de nacimiento: </label><input type="text" id="nueNacio"></form><a><button id="botAñadirCli" onclick="registrarCliente()">Enviar</button></a></div></div>';
    listClientes.appendChild(div);
    nueNom.textContent = "Hora mi rey";
}

function eliminarCliente(){
    console.log("this is another test");
}

document.addEventListener("DOMContentLoaded", listar);