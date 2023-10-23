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

        cliente.innerHTML = "Nombre: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + array[i].nombre + " " + array[i].apellido + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Documento:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + array[i].documento+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Puntos:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + array[i].puntos;
        
        contenedor.appendChild(cliente);
    }
    listaPuntosClientes.appendChild(contenedor);
}

obtenerClientesGuardados();