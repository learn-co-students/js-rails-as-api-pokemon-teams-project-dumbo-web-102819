const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementsByTagName("MAIN")[0];

fetch("http://localhost:3000/trainers")
    .then(res => res.json())
    .then(dataObjs => {
        dataObjs.forEach(turnObjToHtml)
    });

function turnObjToHtml(trainer) {
    let div = document.createElement('div');
    div.className = "card";

    let pTag = document.createElement('p');
    pTag.innerText = trainer.name;
    div.append(pTag);

    let addBtn = document.createElement("button");
    addBtn.dataset.trainerId = trainer.id;
    addBtn.innerText = "Add Pokemon";
    addBtn.style.cursor = "pointer";
    div.append(addBtn);
    
    addBtn.addEventListener('click', () => {
        addPokemon(ul, trainer);
    });
    
    let ul = document.createElement("ul");
    div.append(ul);

    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement("li");
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "release";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.dataset.pokemonId = pokemon.id;
        deleteBtn.innerText = "Release";
        
        li.innerText = `${pokemon.nickname}(${pokemon.species})`;
        li.append(deleteBtn);

        ul.append(li);

        deleteBtn.addEventListener('click', () => {
            removePokemon(li, pokemon);
        });
    });
    
    main.append(div);
}

// function handlePokemonList(div, pokemons) {

// }

function addPokemon(ul, trainer) {
    fetch(`http://localhost:3000/pokemons`, {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify({trainer_id: trainer.id })
    })
    .then(res => res.json())
    .then((pokemon) => {
        trainer.pokemons.push(pokemon);

        let newli = document.createElement("li");

        let newBtn = document.createElement("button");
        newBtn.className = "release";
        newBtn.style.cursor = "pointer";
        newBtn.dataset.pokemonId = pokemon.id;
        newBtn.innerHTML = "Release";

        newBtn.addEventListener('click', () => {
            removePokemon(newli, pokemon)
        });
        
        newli.innerText = `${pokemon.nickname}(${pokemon.species})`;
        newli.append(newBtn);
        
        ul.append(newli);
    })
}

function removePokemon(li, pokemon) {
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(() => li.remove() );
}