const URL_API = "https://note-app-ignacio.onrender.com";

const seccionCreador = document.getElementById('creador-de-notas');
const btnAbrir = document.getElementById('boton-agregar');
const btnCancelar = document.getElementById('cancelar-notaNueva');

btnAbrir.onclick = () => seccionCreador.style.display = 'block';
btnCancelar.onclick = () => seccionCreador.style.display = 'none';

async function cargarNotas() {
    const respuesta = await fetch(URL_API);
    const notas = await respuesta.json();
    
    const contenedor = document.getElementById('lista-de-notas');
    contenedor.innerHTML = '';

    notas.forEach(nota => {
        contenedor.innerHTML += `
            <article class="nota">
                <div class="Header-nota">
                    <span>Categoría ${nota.categoria}</span>
                    <h3>${nota.titulo}</h3>
                </div>
                <div class="body-nota">
                    <p>${nota.contenido}</p>
                </div>
                <div class="Footer-nota">
                    <button onclick="eliminarNota(${nota.id})">eliminar</button>
                </div>
            </article>
        `;
    });
}

document.getElementById('agregar-notaNueva').onclick = async () => {
    const nuevaNota = {
        titulo: document.getElementById('titulo-nuevaNota').value,
        contenido: document.getElementById('contenido-nota').value,
        categoria: document.getElementById('seleccion-cat-nuevaNota').value
    };

    await fetch(URL_API, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(nuevaNota)
    });

    seccionCreador.style.display = 'none'; 
    cargarNotas();
};


async function eliminarNota(id) {
    if(confirm("Se borrara la nota seleccionada")) {
        await fetch(`${URL_API}/${id}`, {
            method: 'DELETE'
        });
        cargarNotas();
    }
}

cargarNotas();