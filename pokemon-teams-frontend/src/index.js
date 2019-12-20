const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const mainContainer = document.querySelector("#main")
// console.log(mainContainer)

fetch("http://localhost:3000/trainers")
.then(r => r.json())
.then((arrayOfTrainers) => {
    // console.log(arrayOfTrainers)
    arrayOfTrainers.forEach((trainer) => {
        makeJSONtoHTML(trainer)
    })
})

function makeJSONtoHTML(trainer) {
    let newDiv = document.createElement("div")
    // console.log(newDiv)
    //div tag finish
    newDiv.className = "card"
    newDiv.dataset.id = `${trainer.id}`
    // p tag 
    let pInsideDiv = document.createElement("p")
    pInsideDiv.innerText = `${trainer.name}`
    newDiv.append(pInsideDiv)
    // button tag 
    let addPokeButton = document.createElement("button")
    addPokeButton.dataset.id = `${trainer.id}`
    addPokeButton.innerText = "Add Pokemon"
    addPokeButton.addEventListener("click", (event) => {
        // console.log(event)
        //use helper method to check if 
        //space is available and add a pokemon
        addPokemon(trainer)
    })
    newDiv.append(addPokeButton)
    // ul tag 
    let ulOfPoke = document.createElement("ul")
    // cycle through pokemons 
    trainer.pokemons.forEach((pokemon) => {
        // console.log(pokemon)
        ulOfPoke.append(makePokemonLi(pokemon, trainer))
    })
    // call helper method to make pokemons
    // makePokemonLi(pokemon)
    //append ul to newDiv
    newDiv.append(ulOfPoke)
    console.log(newDiv)
    mainContainer.append(newDiv)
}


function makePokemonLi(pokemon, trainer) {
    let newLi = document.createElement("li")
    newLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    let releaseButton = document.createElement("button")
    releaseButton.className = "release"
    releaseButton.dataset.pokemonId = `${pokemon.id}`
    releaseButton.innerText = "Release"
    releaseButton.addEventListener("click", (event) => {
        ///// helper to set release mechanism
        // console.log(pokemon.id)
        // console.log(releaseButton.parentNode)
        releaseButton.parentNode.remove()
        // console.log(pokemon.trainer_id)
        // console.log(trainer)
        // trainer.pokemons.remove(pokemon)
        // console.log(trainer)
        releasePokemon(pokemon.id)
    })
    newLi.append(releaseButton)
    // console.log(newLi)
    return newLi
}


function addPokemon(trainer) {
    fetch("http://localhost:3000/pokemons", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            'trainer_id': `${trainer.id}`
        })
    })
    .then(r => r.json())
    .then((pokemon) => {
        // console.log(pokemon)
        ///////// memory, dom  
        // console.log(trainer.pokemons)
        trainer.pokemons.push(pokemon.pokemon)
        console.log(trainer)
        let editDiv = document.querySelector(`div[data-id='${trainer.id}']`)
        // console.log(editDiv)
        let editUl = editDiv.querySelector('ul')
        editUl.append(makePokemonLi(pokemon.pokemon))
    })
}

function releasePokemon(pokemon_id) {
    fetch(`http://localhost:3000/pokemons/${pokemon_id}`, {
        method: "DELETE" 
    })
    .then(r => r.json())
    .then((deletedPoke) => {
        // console.log(deletedPoke)

    })
}