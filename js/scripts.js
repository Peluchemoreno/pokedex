//----------creating an immediately invoked function expression(IIFE) to have control over what variables i want to be global vs local-----
// creating a variable to hold what my iife returns. this obj that gets returned allows me to have control over what happpens to my pokemon list
let pokemonRepo = (() => {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=700';
  let modalContainer = document.querySelector('#modal-container');



  //this will return an array of all pokemon in the pokemonList
  function getAll() {
    return pokemonList
  };

  //this function will validate whether the object type is correct before being stored in the pokemonList array
  function add(newPokemon) {
    if (Object.keys(newPokemon).includes('name') &&
      Object.keys(newPokemon).includes('detailsUrl')) {
      pokemonList.push(newPokemon);
    } else {
      alert('incorrect data type')
    }
  };

  //this function is a general add event listener function that also calls the showDetails function
  function addEventList(element, pokemon) {
    element.addEventListener('click', () => {
      showDetails(pokemon);
    })
  };

  //this function will just load the pokemon image next to its name in the list
  function renderImage(pokemon, btnEl) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(response => {
      return response.json();
    }).then(response => {
      btnEl.innerHTML = `<p>${pokemon.name.toUpperCase()}</p><img src="${response.sprites.front_default}">`;
    })
  }


  //this function handles adding each pokemon to the display screen
  function addListItem(pokemon) {
    let pokemonListHtml = document.querySelector('.list-group.row');
    pokemonListHtml.style.flexDirection = 'row';


    let button = document.createElement('button');
    button.innerText = pokemon.name.toUpperCase();
    renderImage(pokemon, button);

    //temporarily setting the background manually while i debug the color issue
    // button.style.backgroundColor = '#17a2b8';
    button.setAttribute('type', 'button');
    button.classList.add(
      'list-group-item',
      'col-sm-4',
      'btn',
      'btn-info');
    pokemonListHtml.appendChild(button);
    addEventList(button, pokemon);
  };

  //this is a promise based function that collects the pokemon from the pokemon api
  function loadList() {
    return fetch(apiUrl).then(response => {
      return response.json();
    }).then(json => {
      //-------------------------------------------------------------------------------
      //here the results are taken from the api response, that was converted to json, and saved in an object
      json.results.forEach(result => {
        let eachPokemon = {
          name: result.name,
          detailsUrl: result.url
        };
        //afterwards the add() function is called to add each pokemon to our pokemonList
        add(eachPokemon);
      });
    }).catch(error => {
      console.log(error);
    });
  };

  //this function takes the details from the details url from the api
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(response => {
      return response.json();
    }).then(details => {
      //here they are stored in an object
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
      item.isDefault = details.is_default;
    }).catch(e => {
      alert('ERROR LOADING DETAILS');
    })
  };
  //this function removes the .is-visible class from the modal, closing it.
  function closeModal() {
    modalContainer.classList.remove('is-visible');
  };
  //this function allows the modal to be closed by clicking outside of it
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      closeModal();
    }
  })


  //this function allows the modal to be closed by the escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      closeModal();
    }
  });

  //this funciton calls the promise based loadDetails function and creates the modal by building html
  //elements and populating them with classes that correspond to the custom css classes
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      //this line removes everything in the current modal before repopulating it, preventing modal stacking
      modalContainer.innerHTML = '';

      //Here IO start building necessary blocks-------------------------------------------------------------
      let types = [];
      pokemon.types.forEach(type => {
        types.push(type.type.name);
      });
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

      //Pasting it all together----------------------------------------------------
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
    closeModal: closeModal,
  }

})();

pokemonRepo.loadList().then(() => {
  pokemonRepo.getAll().forEach((pokemon) => {
    pokemonRepo.addListItem(pokemon);
  });
});
