const URL1 = 'https://pokeapi.co/api/v2/pokemon'

$(document).ready(() => {
    $('#info').change(seleccion)
    seleccion()
})

function seleccion(){
    var info = $('select').get(0)
    var archivo = ''
    switch (info.value) {
        case "0": archivo = 'pokemon.html'
            break;
        case "1": archivo = 'pruebaQuery.html'
            break;
        case "2": archivo = 'pruebaQuery.html'
            break;
    }
    $.ajax({
        "url": archivo,
        "dataType": 'html',
    }).done(function (data){
        $('#info_obtenida').html(data).get(0).innerHTML = data
        console.log(data)
    })
}

function cargarPokemon(){
    let datosTxT

    fetch(URL1, { method: 'GET' })
        .then(x => x.json())
        .then(x => x.results.forEach(pokemon => imprime_pokemon(pokemon)))

    const imprime_pokemon = (elemento) => {
        datosTxT += ` 
    <tr>
        <td>${elemento.name}</td>
        <td>${elemento.url}</td>
    </tr>
    `
        document.getElementById("cuerpo_tabla").innerHTML = datosTxT

    }
}