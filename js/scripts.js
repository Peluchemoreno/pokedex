//----------creating an immediately invoked function expression(IIFE) to have control over what variables i want to be global vs local-----
// creating a variable to hold what my iife returns. this obj that gets returned allows me to have control over what happpens to my pokemon list
let pokemonRepo = (function () {
    let pokemonList = [
        {
            name: 'squirtle',
            height: .5,
            types: ['water']
        },

        {
            name: 'poliwrath',
            height: 1.3,
            types: ['water', 'fighting']
        },
        {
            name: 'charizard',
            height: 1.7,
            types: ['fire', 'flying']
        },
        {
            name: 'pikachu',
            height: .4,
            types: ['electric']
        },
        {
            name: 'umbreon',
            height: 1,
            types: ['dark']
        },
        {
            name: 'espeon',
            height: .9,
            types: ['psychic']
        }
    ];

    function add(newPokemon) {
        if (typeof newPokemon === "object") {
            //going to return to try and validate using Object.keys
        } else {
            alert('incorrect data type')
        }
    };

    function getAll() {
        return pokemonList
    };

    return {
        add: add,
        getAll: getAll,
    }

})();


//---------------------Rewriting my for loop as a forEach array method--------------------------------

//also here i updated the function to work with my IIFE
pokemonRepo.getAll().forEach(pokemon => document.write(`<div class="new-item">${pokemon.name} |${pokemon.height}| ${pokemon.types}</div>`));

console.log(pokemonRepo.getAll());
