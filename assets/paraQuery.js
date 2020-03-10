const URL1 = 'https://pokeapi.co/api/v2/pokemon/'
var URLaux = ''
let photo 
let auxCartas = ''
let auxLista = ''
let arregloLista = []
let arregloCartas = []
let datosLista = ''
let datosCarta = ''

$(document).ready(() => {
    $('#seleccion_inicial').change(seleccion)
    seleccion()
})

//busca la opcion ingresada inicial, agregando la pagina: esperandoOpcion.html que solo imprime un parrafo indicando que seleccione una opcion
function seleccion(){
    var info = $('#seleccion_inicial').get(0)
    var archivo = ''
    switch (info.value) {
        case "0": archivo = 'esperandoOpcion.html'
            break
        case "1": archivo = 'todosLosPokemon.html'
            break
        case "2": archivo = 'listaPokemon.html'
            break
        default: archivo = 'esperandoOpcion.html'
    }
    $.ajax({
        "url": archivo,
        "dataType": 'html',
    }).done(function (data){
        $('#info_obtenida').html(data).get(0).innerHTML = data
    })
}

//Esta  funcion se ejecuta desde el archivo todosLosPokemon, en donde existe una division con id del tipo columnas, 
//todos los valores adquiridos de la URL1, ingresaran a la funcion arregloURL que generara un String con la suma de
//todas las URL y el nombre adquirido por el fetch. Ejemplo: https://pokeapi.co/api/v2/pokemon/nombre1 ...
//posterior a esto, el string se guarda en un arreglo llamado arregloCartas y se le elimina el primer elemento que 
//es undefined, con la funcion.shift(). Teniendo todas las URL de cada pokemon en este arreglo, se recorrera para 
//consumir los datos necesarios de cada URL creada.
function cartasPokemon() {
    fetch(URL1, { method: 'GET' })
        .then(x => x.json())
        .then(x => x.results.forEach(pokemon => arregloURL(pokemon)))

    const arregloURL = (elemento) => {
        auxCartas += ";" + URL1 + elemento.name
    }
    arregloCartas = auxCartas.split(';')
    arregloCartas.shift()
    // console.log(arregloLista.length)
    arregloCartas.forEach(x => promesa(x))
}

function promesa(url){
    fetch(url, { method: 'GET'})
    .then(x => x.json())
            .then(pokemon => imprime(pokemon))
}

function imprime(poke){
    datosCarta += ` 
    <div class="col mb-4">
        <div class="card">
        <img src="${poke.sprites.front_default}" class="card-img-top" alt="${poke.name}">
            <div class="card-body">
                <p class="card-text"><small class="text-muted">Nombre Pokemon:</small></p>
                <h5 class="card-title text-black-50">${poke.name}</h5>
                <p class="card-text text-black-50">ID: ${poke.id}</p>
            </div>
        </div>
    </div>
    `
    document.getElementById("cuerpo_carta").innerHTML = datosCarta
}

//Esta  funcion se ejecuta desde el archivo listarPokemon, en donde existe un selector con id el cual se sobre escribira con
//todos los valores adquiridos de la URL1, para posteriormente poder acceder a cada pokemon de forma individual
function listarPokemon() {
    fetch(URL1, { method: 'GET' })
        .then(x => x.json())
        .then(x => x.results.forEach(pokemon => listar(pokemon)))

    const listar = (elemento) => {
        auxLista += ";" + URL1 + elemento.name
        datosLista += ` 
                    <option>${elemento.name}</option>
                `
        document.getElementById("info2").innerHTML = datosLista
    }
    arregloLista = auxLista.split(';')
    arregloLista.shift()
}