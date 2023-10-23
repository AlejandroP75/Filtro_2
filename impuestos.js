let videojuegosCom = [];

function obtenerVideojuegosGuardados() {
    const videojuegosGuardados = localStorage.getItem("videojuegos");
    if (videojuegosGuardados) {
        videojuegosCom = JSON.parse(videojuegosGuardados);
        listarVid(videojuegosCom);
    }
}

obtenerVideojuegosGuardados();

export function sacarIVA(){
    for(let i = 0; i < videojuegosCom.length; i++){
        let videojuegoCom = document.getElementById(videojuegosCom[i].id);
        if(videojuegoCom.checked){
            return videojuegosCom[i].valor * 0.16;
        }
    }
}

export function sacarImpuestoEspecial(){
    for(let i = 0; i < videojuegosCom.length; i++){
        let videojuegoCom = document.getElementById(videojuegosCom[i].id);
        if(videojuegoCom.checked){
            return videojuegosCom[i].valor * 0.04;
        }
    }
}
