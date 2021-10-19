/*
  index.js

  @author Miguel Jaque <mjaque@fundacionloyola.es>
  @license GPL-3.0-or-later
*/
'use strict'

window.onload = iniciar

function iniciar(){
  document.getElementById('btnCrear').onclick = crear
  document.getElementById('btnVer').onclick = ver
}

function ver(){
  let nombre
  if (nombre = prompt('Indica el nombre del avatar: '))
    window.location.href = `ver.html#${nombre}`
}

function crear(){
  window.location.href = 'crear.php'
}
