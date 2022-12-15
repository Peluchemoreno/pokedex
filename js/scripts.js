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
    if (typeof newPokemon === "object" &&
      Object.keys(newPokemon).includes('name') &&
      Object.keys(newPokemon).includes('height') &&
      Object.keys(newPokemon).includes('types')) {
      pokemonList.push(newPokemon);
    } else {
      alert('incorrect data type')
    }
  };

  function getAll() {
    return pokemonList
  };

  function showDetails(pokemon) {
    console.log(pokemon.name);
  };

  function addListItem(pokemon) {
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('new-item');
    listItem.appendChild(button);
    pokemonListHtml.appendChild(listItem);
    addEventList(button, pokemon);
  };

  function addEventList(element, pokemon) {
    element.addEventListener('click', function () {
      showDetails(pokemon)
    })
  };


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  }

})();



pokemonRepo.add({
  name: 'ivysaur',
  height: 1,
  types: ['water', 'poison']
});


let pokemonListHtml = document.querySelector('.pokemon-list');

pokemonRepo.getAll().forEach(pokemonRepo.addListItem);

console.log(pokemonRepo.getAll());
