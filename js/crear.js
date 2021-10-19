/*
  crear.js

  @author Miguel Jaque <mjaque@fundacionloyola.es>
  @license GPL-3.0-or-later
*/
'use strict'

const imagenes = {
  guardian: ['guardian1.png', 'guardian2.png', 'guardian3.png'],
  mago: ['mago1.png', 'mago2.png'],
  sanador: ['sanador1.png', 'sanador2.png']
}
const poderes = {
  guardian: [{
      imagen: 'proteccion1.jpg',
      descripcion: 'Protección 1: Evita el ataque a otro miembro de su equipo recibiendo la mitad del daño en PVs. La otra mitad es recibida por el jugador atacado. '
    },
    {
      imagen: 'escudo1.jpg',
      descripcion: 'Escudo 1: Protege a un miembro del equipo asegurando una nota mínima de 5 en una tarea. Debe utilizarse antes de la entrega y la nota final se reduce en 2 puntos. '
    }
  ],
  mago: [{
      imagen: 'confusion1.jpg',
      descripcion: 'Confusión 1: Desvía un ataque a otro miembro del equipo. '
    },
    {
      imagen: 'controltiempo1.jpg',
      descripcion: 'Control del Tiempo 1: Consigue un día extra en el plazo de entrega de una tarea para un miembro del equipo. '
    }
  ],
  sanador: [{
      imagen: 'sanacion1.jpg',
      descripcion: 'Sanación 1: Repone hasta 3 PV a cualquier miembro de su equipo. '
    },
    {
      imagen: 'auxilio1.jpg',
      descripcion: 'Auxilio 1: Consigue 2 puntos extra en la nota de una tarea para un miembro del equipo. Debe utilizarse antes de la entrega y la nota final no podrá ser superior a 8.'
    }
  ]
}

var sRol = null
var divImagenes = null
var imagenSeleccionada = null
var poderSeleccionado = null

window.onload = iniciar

function iniciar() {
  sRol = document.getElementById('sRol')
  divImagenes = document.getElementById('divImagenes')
  sRol.onchange = cargarImagenes
  cargarImagenes()
  document.getElementById('btnEnviar').onclick = enviar
}

function cargarImagenes() {
  const rol = sRol.value

  //Vacíamos las imágenes
  while (divImagenes.lastChild)
    divImagenes.removeChild(divImagenes.lastChild)

  for (let imagen of imagenes[rol]) {
    let img = document.createElement('img')
    divImagenes.appendChild(img)
    img.setAttribute('src', `img/${imagen}`)
    img.onclick = seleccionarImagen
  }
  cargarPoderes(rol)
}

function seleccionarImagen(evento){
  //Quitamos el borde a todas las imágenes
  for(let img of document.querySelectorAll('#divImagenes img'))
    img.style.border = '1px solid grey'
  evento.target.style.border = '3px solid blue'
  let url = evento.target.src
  imagenSeleccionada = url.substr(url.lastIndexOf('/') + 1, url.length)
}

function cargarPoderes(rol) {
  //Vacíamos las imágenes
  while (divPoderes.lastChild)
    divPoderes.removeChild(divPoderes.lastChild)

  for (let poder of poderes[rol]) {
    let img = document.createElement('img')
    divPoderes.appendChild(img)
    img.setAttribute('src', `img/${poder.imagen}`)
    img.setAttribute('title', poder.descripcion)
    img.onclick = seleccionarPoder
  }
}

function seleccionarPoder(evento){
  //Quitamos el borde a todas las imágenes
  for(let img of document.querySelectorAll('#divPoderes img'))
    img.style.border = '1px solid grey'
  evento.target.style.border = '3px solid blue'
  let url = evento.target.src
  poderSeleccionado = {}
  poderSeleccionado.imagen = url.substr(url.lastIndexOf('/') + 1, url.length)
  let titulo = evento.target.getAttribute('title')
  poderSeleccionado.nombre = titulo.substr(0, titulo.indexOf(':'))
}

function enviar() {
  let nombre = document.getElementById('iNombre').value
  if (nombre.length < 5){
    alert("El nombre de usuario no es correcto.")
    return false;
  }

  let pv = parseInt(document.getElementById('pv').value)
  let pp = parseInt(document.getElementById('pp').value)

  if (pv + pp != 20){
    alert("La suma de PV y PP debe ser 20.")
    return false;
  }

  let perfil = {}
  perfil.nombre = nombre
  perfil.rol = sRol.value
  perfil.pv = pv
  perfil.pp = pp
  perfil.imagen = imagenSeleccionada
  perfil.poder = poderSeleccionado

  fetch('crear.php', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(perfil)
    })
    .then(respuesta => respuesta.text())
    .then(datos => {
      if (datos == 'OK'){
        alert('Tu avatar se creó correctamente.')
        window.location.href = 'ver.html#' + nombre
      }
      else{
        alert('Parece que ocurrió algún error. Consulta al profe.')
      }
    });
}
