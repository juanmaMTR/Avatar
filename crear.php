<?php
$cuerpo = file_get_contents('php://input');
if ($cuerpo){
	$datos = json_decode($cuerpo);
	$avatar = new stdClass();
	$avatar->nombre = $datos->nombre;
	$avatar->imagen = $datos->imagen;
	$avatar->equipo = null;
	$avatar->pv = $datos->pv . '/20';
	$avatar->pp = $datos->pp . '/20';
	$avatar->px = '0/10';
	$avatar->poderes = [];
	$avatar->poderes[0] = $datos->poder;

	$fichero = fopen("alumnos/".$avatar->nombre.".json", "w");
	if (!$fichero) die('KO');
	fwrite($fichero, json_encode($avatar));
	fclose($fichero);
	die('OK');
}
?>
<!doctype html>
<html lang=es>

<head>
	<meta charset=utf-8 />
	<meta content=author value="Miguel Jaque <mjaque@fundacionloyola.es" />
	<meta name=viewport content="width=device-width, initial-scale=1" />
	<title>4ESO TIC - Creación de Avatar</title>

	<link rel=stylesheet href=css/reset.css />
	<link rel=stylesheet href=css/crear.css />
</head>

<body>
	<div id=divModal>
		<h1>Crea tu Avatar</h1>
			<p>Completa el formulario para crear tu Avatar:</p>

			<label for=nombre>Nombre: </label>
			<input type=text id=iNombre />
			<p class=pista>Escribe tu nombre de email, sin .guadalupe@alumnado.fundacionloyola.net</p>
			<br />

			<label for=rol>¿Con qué rol quieres jugar?</label>
			<select id=sRol>
				<option value=guardian>Guardián</option>
				<option value=mago>Maga/o</option>
				<option value=sanador>Sanador/a</option>
			</select>

			<p>Reparte 20 puntos entre Puntos de Vida(PV) y Puntos de Poder(PP):</p>
			<label for=pv>Puntos de Vida (PV): </label>
			<input type=number max=19 min=1 id=pv />

			<label for=pv>Puntos de Poder (PP): </label>
			<input type=number max=19 min=1 id=pp />
			<p class=pista>Si eres un "guardián" te conviene tener más PV que PP. Si eres un maga/o, te conviene tener más PP que PV. Y si eres un sanador/a, te conviene tenerlos equilibrados.</p>
			<br />

			<p>Elige la imagen de tu Avatar:</p>
			<div class=eleccion id=divImagenes /></div>

			<br />
			<p>Elige tu primer poder:</p>
			<p class=pista>Pasando el ratón por el icono de poder verás su descripción.</p>
			<div class=eleccion id=divPoderes>
				<img src=img/escudo1.png title="El guardián protege a un miembro del equipo asegurando una nota mínima de 5 en una tarea. Debe utilizarse antes de la entrega y la nota final se reduce en 2 puntos.
" />
				<img src=img/proteccion1.jpg title="El guardián evita el ataque a otro miembro de su equipo recibiendo la mitad del daño en PVs. La otra mitad es recibida por el jugador atacado. " />
			</div>

			<button type=button id=btnEnviar>Enviar</button>
	</div>
	<script src=js/crear.js></script>
</body>

</html>
