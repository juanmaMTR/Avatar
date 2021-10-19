class Avatar {
  constructor() {
    //Espera que se llame con http://.../#alumno
    this.alumno = window.location.hash.substr(1)
    window.onload = this.cargar.bind(this)
  }

  cargar() {
    let opciones = {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json', // 'application/x-www-form-urlencoded',
        'charset': 'utf-8'
      }
    }
    fetch('./alumnos/' + this.alumno + '.json', opciones)
      .then(respuesta => respuesta.json())
      .then(avatar => this.mostrar(avatar))
  }

  mostrar(avatar){
    //console.log(avatar)
    document.getElementById('pNombre').appendChild(document.createTextNode(avatar.nombre))
    document.querySelector('#divAvatar > img').src = 'img/' + avatar.imagen
    if (avatar.equipo){
      document.querySelector('#divEquipo > img').src = 'img/' + avatar.equipo.imagen
      document.querySelector('#divEquipo > img').title = avatar.equipo.nombre
    }
    document.querySelectorAll('#divVida span')[1].appendChild(document.createTextNode(avatar.pv))
    document.querySelector('#divVida > div > div').style.width = 100 * eval(avatar.pv) + '%'
    document.querySelectorAll('#divPoder span')[1].appendChild(document.createTextNode(avatar.pp))
    document.querySelector('#divPoder > div > div').style.width = 100 * eval(avatar.pp) + '%'
    document.querySelectorAll('#divExperiencia span')[1].appendChild(document.createTextNode(avatar.px))
    document.querySelector('#divExperiencia > div > div').style.width = 100 * eval(avatar.px) + '%'

    avatar.poderes.forEach(poder => {
      let divPoderes = document.getElementById('divPoderes')
      let div = document.createElement('div')
      divPoderes.appendChild(div)
      let img = document.createElement('img')
      div.appendChild(img)
      img.src = 'img/' + poder.imagen
      let p = document.createElement('p')
      div.appendChild(p)
      p.appendChild(document.createTextNode(poder.nombre))
    })
  }
}

new Avatar()
