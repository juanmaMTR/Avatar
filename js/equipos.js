/*
  index.js

  @author Miguel Jaque <mjaque@fundacionloyola.es>
  @license GPL-3.0-or-later
*/
'use strict'

window.onload = iniciar

function iniciar(){
  for (let img of document.querySelectorAll('#divEquipos img'))
    img.onclick = function(){ img.style.display = 'none'}
}
