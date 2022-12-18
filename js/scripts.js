//----------creating an immediately invoked function expression(IIFE) to have control over what variables i want to be global vs local-----
// creating a variable to hold what my iife returns. this obj that gets returned allows me to have control over what happpens to my pokemon list
let pokemonRepo = (() => {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=300';
  let modalContainer = document.querySelector('#modal-container');


  function getAll() {
    return pokemonList
  };

  function add(newPokemon) {
    if (Object.keys(newPokemon).includes('name') &&
      Object.keys(newPokemon).includes('detailsUrl')) {
      pokemonList.push(newPokemon);
    } else {
      alert('incorrect data type')
    }
  };

  function addEventList(element, pokemon) {
    element.addEventListener('click', () => {
      showDetails(pokemon);
    })
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
      item.isDefault = details.is_default;
    }).catch(e => {
      alert('ERROR LOADING DETAILS');
    })
  };

  function closeModal() {
    modalContainer.classList.remove('is-visible');
  }


  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      modalContainer.innerHTML = '';
      let types = [];
      console.log(pokemon.types);
      pokemon.types.forEach(type => {
        types.push(type.type.name);
      });
      console.log(types);
      let modal = document.createElement('div');
      modal.classList.add('modal');
      let modalHeader = document.createElement('div');
      modalHeader.classList.add('modal-header');
      let modalHeaderText = document.createElement('h2');
      modalHeaderText.classList.add('modal-header-text');
      modalHeaderText.textContent = pokemon.name;
      let modalCloseButton = document.createElement('button');
      modalCloseButton.classList.add('modal-close-btn');
      modalCloseButton.innerText = 'Close';
      let pokeImg = document.createElement('img');
      pokeImg.src = `${pokemon.imageUrl}`;
      pokeImg.classList.add('image');
      let detailsContainer = document.createElement('div');
      detailsContainer.classList.add('more-details-container');
      let typesBox = document.createElement('div');
      typesBox.classList.add('types-box');

      typesBox.textContent = `Types: ${types}`;
      let heightBox = document.createElement('div');
      heightBox.classList.add('height-box');
      heightBox.textContent = `Height: ${pokemon.height}`;

      detailsContainer.appendChild(heightBox);
      detailsContainer.appendChild(typesBox);
      modalHeader.appendChild(modalHeaderText);
      modalHeader.appendChild(modalCloseButton);
      modal.appendChild(modalHeader);
      modal.appendChild(pokeImg);
      modal.appendChild(detailsContainer);
      modalContainer.appendChild(modal);

      modalCloseButton.addEventListener('click', closeModal);

      modalContainer.classList.add('is-visible');
    });
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
