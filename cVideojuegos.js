let listClientesCom = document.getElementById("listClientesCom");
let listVideojuegosCom = document.getElementById("listVideojuegosCom");

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

function listarVid(array){
    while(listVideojuegosCom.firstChild){
        listVideojuegosCom.removeChild(listVideojuegosCom.firstChild);
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
    listVideojuegosCom.appendChild(contenedor);
}

function listarCli(array){
    while(listClientesCom.firstChild){
        listClientesCom.removeChild(listClientes.firstChild);
    }
    let contenedor = document.createElement("div");
    for(let i = 0; i < array.length; i++){
        let cliente = document.createElement("li");
        let enlaceMod = document.createElement("a");
        enlaceMod.setAttribute("href", "#openModalMod");
        let botModificar = document.createElement("button");
        botModificar.setAttribute("onclick", "modificarModal(" + array[i].documento + ")");
        let botEliminar = document.createElement("button");
        botEliminar.setAttribute("onclick", "eliminarCliente(" + array[i].documento + ")");

        cliente.innerHTML = "Nombre: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + array[i].nombre + " " + array[i].apellido + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Documento:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + array[i].documento;
        botModificar.textContent = "Modificar";
        botEliminar.textContent = "Eliminar";

        enlaceMod.appendChild(botModificar);
        contenedor.appendChild(cliente);
        contenedor.appendChild(enlaceMod);
        contenedor.appendChild(botEliminar);
    }
    listClientesCom.appendChild(contenedor);
}