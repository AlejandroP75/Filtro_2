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

function listar(){
    nueCli1 = new cliente(1007788706, "Alejandro", "Palacio", 3222039907, "diego_palacio5@hotmail.com", 22, "Colombiano");
    nueCli2 = new cliente(1007788706, "David", "Pabon", 3222039907, "diego_palacio5@hotmail.com", 22, "Colombiano");
    nueCli3 = new cliente(1007788706, "Ingrid", "Lopez", 3222039907, "diego_palacio5@hotmail.com", 22, "Colombiano");
    nueCli4 = new cliente(1007788706, "Noel", "Soto", 3222039907, "diego_palacio5@hotmail.com", 22, "Colombiano");
    nueCli5 = new cliente(1007788706, "Camila", "Martinez", 3222039907, "diego_palacio5@hotmail.com", 22, "Colombiano");
    clientes.push(nueCli1);
    clientes.push(nueCli2);
    clientes.push(nueCli3);
    clientes.push(nueCli4);
    clientes.push(nueCli5);

    let contenedor = document.createElement("div");

    for(let i = 0; i < clientes.length; i++){
        let cliente = document.createElement("li");
        let botModificar = document.createElement("button");
        let botEliminar = document.createElement("button");

        cliente.innerHTML = "Nombre: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + clientes[i].nombre + " " + clientes[i].apellido + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Documento:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + clientes[i].documento;
        botModificar.textContent = "Modificar";
        botEliminar.textContent = "Eliminar";

        contenedor.appendChild(cliente);
        contenedor.appendChild(botModificar);
        contenedor.appendChild(botEliminar);
    }

    listClientes.appendChild(contenedor);
}



document.addEventListener("DOMContentLoaded", listar);
