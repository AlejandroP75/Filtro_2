let listClientesCom = document.getElementById("listClientesCom");
let listVideojuegosCom = document.getElementById("listVideojuegosCom");
let modalFactura = document.getElementById("modalFactura");

let clientesCom = [];
let videojuegosCom = [];

function obtenerClientesGuardados() {
    const clientesGuardados = localStorage.getItem("clientes");
    if (clientesGuardados) {
        clientesCom = JSON.parse(clientesGuardados);
        listarCli(clientesCom);
    }
}

function obtenerVideojuegosGuardados() {
    const videojuegosGuardados = localStorage.getItem("videojuegos");
    if (videojuegosGuardados) {
        videojuegosCom = JSON.parse(videojuegosGuardados);
        listarVid(videojuegosCom);
    }
}

obtenerClientesGuardados();
obtenerVideojuegosGuardados();


function listarCli(array){
    while(listClientesCom.firstChild){
        listClientesCom.removeChild(listClientesCom.firstChild);
    }
    let contenedor = document.createElement("div");
    for(let i = 0; i < array.length; i++){
        let cliente = document.createElement("li"); 
        cliente.setAttribute("class", "contCliente");
        let radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "cliente");
        radio.setAttribute("id", array[i].documento);
        radio.setAttribute("value", array[i].documento);

        cliente.innerHTML = "<strong>" + array[i].nombre + " " + array[i].apellido + "</strong>" + array[i].documento;
        
        cliente.appendChild(radio);
        contenedor.appendChild(cliente);
    }
    listClientesCom.appendChild(contenedor);
}

function listarVid(array){
    while(listVideojuegosCom.firstChild){
        listVideojuegosCom.removeChild(listVideojuegosCom.firstChild);
    }
    let contenedor = document.createElement("div");
    for(let i = 0; i < array.length; i++){
        let videojuego = document.createElement("li");
        videojuego.setAttribute("class", "contVideojuego");
        let radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "videojuego");
        radio.setAttribute("id", array[i].id);
        radio.setAttribute("value", array[i].id);

        videojuego.innerHTML = "<strong>" + array[i].nombre + "</strong>" + Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP',  minimumFractionDigits: 0, maximumFractionDigits: 0  }).format(array[i].valor);

        videojuego.appendChild(radio);
        contenedor.appendChild(videojuego);
    }
    listVideojuegosCom.appendChild(contenedor);
}

function comprar(){
    let valor = 0;
    let nombre = "";
    let puntos = 0;
    let impIVA = 0;
    let impEs = 0;
    let nomCli = 0;
    let encontradoCli = false;
    let encontradoVid = false;

    for(let i = 0; i < clientesCom.length; i++){
        let clienteCom = document.getElementById(clientesCom[i].documento);
        if (clienteCom.checked){
            encontradoCli = true;
        }
    }
    for(let i = 0; i < videojuegosCom.length; i++){
        let videojuegoCom = document.getElementById(videojuegosCom[i].id);
        if(videojuegoCom.checked){
            encontradoVid = true;
        }
    }
    if(encontradoCli == false){
        alert("Seleccione un cliente");
        return
    }
    if(encontradoVid == false){
        alert("Seleccione un videojuego");
        return
    }
    for(let i = 0; i < videojuegosCom.length; i++){
        let videojuegoCom = document.getElementById(videojuegosCom[i].id);
        if(videojuegoCom.checked){
            nombre = videojuegosCom[i].nombre;
            valor = videojuegosCom[i].valor;
            impIVA = videojuegosCom[i].valor * 0.16;
            impEs = videojuegosCom[i].valor * 0.04;
            puntos = videojuegosCom[i].puntos;
        }
    }
    for(let i = 0; i < clientesCom.length; i++){
        let clienteCom = document.getElementById(clientesCom[i].documento);
        if (clienteCom.checked){
            nomCli = clientesCom[i].nombre;
            clientesCom[i].puntos = clientesCom[i].puntos + parseInt(puntos);
            guardarClientes();
        }
    }
    let total = (parseInt(valor) + parseInt(impIVA) + parseInt(impEs));
    let existeDiv = document.getElementById("openModalRecibo");
    if (existeDiv) {
        existeDiv.parentNode.removeChild(existeDiv);
    }
    let div = document.createElement("div");
    div.innerHTML = '<div id="openModalRecibo" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h1 class="tituloModal">Gracias por su compra</h1><hr><h2 class = "espForm">Factura</h2><p><strong></strong></p><p class = "espForm">Nombre del cliente: ' + nomCli + '</p><p class = "espForm">Titulo del videojuego: ' + nombre + '</p><p class = "espForm">Valor del videojuego: ' + Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP',  minimumFractionDigits: 0, maximumFractionDigits: 0  }).format(valor) + '</p><p class = "espForm">Puntos por compra: ' + puntos + '</p><p class = "espForm">IVA: ' + Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP',  minimumFractionDigits: 0, maximumFractionDigits: 0  }).format(impIVA) + '</p><p class = "espForm">Impuesto especial: ' + Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP',  minimumFractionDigits: 0, maximumFractionDigits: 0  }).format(impEs) + '</p><hr><p class = "espForm">Total a pagar: ' + Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP',  minimumFractionDigits: 0, maximumFractionDigits: 0  }).format(total) + '</p></div></div>';
    modalFactura.appendChild(div);
}

function guardarClientes() {
    const clientesJSON = clientesCom.map(cliente => ({
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