const URL1 = 'https://pokeapi.co/api/v2/pokemon/'
const URL2 = 'https://pokeapi.co/api/v2/pokemon/1/'
const URL3 = 'https://pokeapi.co/api/v2/evolution-chain/1/'
var URLaux = ''
let photo 

$(document).ready(() => {
    $('#seleccion_inicial').change(seleccion)
    seleccion()
})


function seleccion(){
    var info = $('#seleccion_inicial').get(0)
    var archivo = ''
    switch (info.value) {
        case "0": archivo = 'pokemon.html'
            break;
        case "1": archivo = 'bulbasaur.html'
            break;
    }
    $.ajax({
        "url": archivo,
        "dataType": 'html',
    }).done(function (data){
        $('#info_obtenida').html(data).get(0).innerHTML = data
    })
}

function cargarPokemon(){
    let datosTxT

    fetch(URL1, { method: 'GET' })
        .then(x => x.json())
        .then(x => x.results.forEach(pokemon => imprime_pokemon(pokemon)))

    const imprime_pokemon = (elemento) => {
        URLaux = URL1+elemento.name
        fetch(URLaux, {method: 'GET'})
            .then(x => x.json())
            .then(pokemon => imprime(pokemon))

            const imprime = (poke) => {
                datosTxT += ` 
                <tr>
                    <td>${poke.name}</td>
                    <td> <img src = "${poke.sprites.front_default}"> </img></td>
                </tr>
                `
                    document.getElementById("cuerpo_tabla").innerHTML = datosTxT
            }
    }
}

function cargarHabilidad(){
    datosTxT = null

    fetch(URL2, { method: 'GET' })
        .then(x => x.json())
        .then(x => x.abilities.forEach(pokemon => imprime_pokemon(pokemon)))

    const imprime_pokemon = (elemento) => {
        datosTxT += ` 
    <tr>
        <td>${elemento.ability.name}</td>
    </tr>
    `
        document.getElementById("cuerpo_tabla").innerHTML = datosTxT
    }
}

function cargarEvoluciones(){
    datosTxT = null

    fetch(URL3, { method: 'GET' })
        .then(x => x.json())
        .then(x => x.chain.evolves_to.forEach(pokemon => imprime_pokemon(pokemon)))

    const imprime_pokemon = (elemento) => {
        datosTxT += `<tr><a href="https://pokeapi.co/api/v2/pokemon-species/2/"> ${elemento.species.name} </a></tr>`
        document.getElementById("cuerpo_tabla").innerHTML = datosTxT
    }
}