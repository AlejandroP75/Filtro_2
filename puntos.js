let listaPuntosClientes = document.getElementById("listaPuntosClientes");

let clientesPun = [];

function obtenerClientesGuardados() {
    const clientesGuardados = localStorage.getItem("clientes");
    if (clientesGuardados) {
        clientesPun = JSON.parse(clientesGuardados);
        listarCli(clientesPun);
    }
}

function listarCli(array){
    while(listaPuntosClientes.firstChild){
        listaPuntosClientes.removeChild(listaPuntosClientes.firstChild);
    }
    let contenedor = document.createElement("div");
    for(let i = 0; i < array.length; i++){
        let cliente = document.createElement("li");
        cliente.setAttribute("class", "contPuntos"); 

        cliente.innerHTML = "<strong>Nombre: </strong>" + array[i].nombre + " " + array[i].apellido + "<strong>Documento: </strong>" + array[i].documento + "<strong>Puntos</strong><strong class = 'resaltar'>" + array[i].puntos + "</strong>";
        
        contenedor.appendChild(cliente);
    }
    listaPuntosClientes.appendChild(contenedor);
}

obtenerClientesGuardados();