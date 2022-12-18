//----------creating an immediately invoked function expression(IIFE) to have control over what variables i want to be global vs local-----
// creating a variable to hold what my iife returns. this obj that gets returned allows me to have control over what happpens to my pokemon list
let pokemonRepo = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=500';
  //1. create a function for loading the list of pokemon



  function add(newPokemon) {
    if (Object.keys(newPokemon).includes('name') &&
      Object.keys(newPokemon).includes('detailsUrl')) {
      pokemonList.push(newPokemon);
    } else {
      alert('incorrect data type')
    }
  };

  function getAll() {
    return pokemonList
  };

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(response => {
      return response.json();
    }).then(details => {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(e => {
      alert('ERROR LOADING DETAILS');
    })
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then((pokemon) => {
      console.log(pokemon);
    });
  };

  function addListItem(pokemon) {
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = `${pokemon.name}`;
    button.classList.add('new-item');
    listItem.appendChild(button);
    pokemonListHtml.appendChild(listItem);
    addEventList(button, pokemon);
  };

  function loadList() {
    //2. return the results of the fetch call. ** the results will be a promise object**
    return fetch(apiUrl).then(response => {
      //2b. then return a jsonified response using .then method to handle the response from the api
      return response.json();
      //3. log the results of the jsonified response using another .then method
    }).then(json => {
      json.results.forEach(result => {
        let eachPokemon = {
          name: result.name,
          detailsUrl: result.url
        };
        add(eachPokemon);
      });
    }).catch(error => {
      console.log(error);
    });
  }

  function addEventList(element, pokemon) {
    element.addEventListener('click', () => {
      showDetails(pokemon);
    })
  };


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  }

})();



let pokemonListHtml = document.querySelector('.pokemon-list');


pokemonRepo.loadList().then(() => {
  pokemonRepo.getAll().forEach((pokemon) => {
    pokemonRepo.addListItem(pokemon);
  });
});
