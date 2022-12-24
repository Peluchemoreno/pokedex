//----------creating an immediately invoked function expression(IIFE) to have control over what variables i want to be global vs local-----
// creating a variable to hold what my iife returns. this obj that gets returned allows me to have control over what happpens to my pokemon list
let pokemonRepo = (() => {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=7';




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
    }).catch(error => {
      console.log(error);
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
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal');
    button.classList.add(
      'list-group-item',
      'col-sm-4',
      'btn.btn-info',
    );
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
    }).catch(e => {
      alert('ERROR LOADING DETAILS');
    })
  };

  //this funciton calls the promise based loadDetails function and creates the modal by building html
  //elements and populating them with classes that correspond to the custom css classes
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      //Here IO start building necessary blocks-------------------------------------------------------------

      let modal = document.querySelector('#modal');
      modal.innerHTML = '';

      let modalDialog = document.createElement('div');
      modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
      modalDialog.setAttribute('role', 'document');

      modal.appendChild(modalDialog);


      let modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      modalDialog.appendChild(modalContent);


      let modalHeader = document.createElement('div');
      modalHeader.classList.add('modal-header');

      modalContent.appendChild(modalHeader);


      let modalTitle = document.createElement('h2');
      modalTitle.classList.add('modal-title');
      modalTitle.textContent = pokemon.name.toUpperCase();
      modalTitle.setAttribute('id', 'modalLabel');

      modalHeader.appendChild(modalTitle);


      let modalCloseButton = document.createElement('button');
      modalCloseButton.classList.add('close');
      modalCloseButton.setAttribute('type', 'button');
      modalCloseButton.setAttribute('data-dismiss', 'modal');
      modalCloseButton.setAttribute('aria-label', 'close');

      modalHeader.appendChild(modalCloseButton);

      let xSpan = document.createElement('span');
      xSpan.setAttribute('aria-hidden', 'true');
      xSpan.innerText = 'x';

      modalCloseButton.appendChild(xSpan);


      let pokeImg = document.createElement('img');
      pokeImg.src = `${pokemon.imageUrl}`;


      let modalBody = document.createElement('div');
      modalBody.classList.add('modal-body');

      modalContent.appendChild(modalBody);


      let modalGrid = document.createElement('div');
      modalGrid.classList.add('container-fluid');

      modalBody.appendChild(modalGrid);


      let modalRow1 = document.createElement('div');
      modalRow1.classList.add('row');

      modalGrid.appendChild(modalRow1);

      let modalColumn1 = document.createElement('div');
      modalColumn1.classList.add('col');
      modalRow1.appendChild(modalColumn1);

      let modalColumn2 = document.createElement('div');
      modalColumn2.classList.add('col');
      modalRow1.appendChild(modalColumn2);

      let modalColumn3 = document.createElement('div');
      modalColumn3.classList.add('col');
      modalRow1.appendChild(modalColumn3);

      modalColumn1.innerHTML = `<img src="${pokeImg.src}"></img>`;
      modalColumn2.innerText = 'bye';
      modalColumn3.innerText = 'seeya';

      let modalFooter = document.createElement('div');
      modalFooter.classList.add('modal-footer');

      let footerButton = document.createElement('button');
      footerButton.setAttribute('type', 'button');
      footerButton.setAttribute('data-dismiss', 'modal');
      footerButton.classList.add('btn', 'btn-info');
      footerButton.innerText = 'Close';

      modalContent.appendChild(modalFooter);
      modalFooter.appendChild(footerButton);

      console.log(pokemon.sprites.front_default);

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

pokemonRepo.loadList().then(() => {
  pokemonRepo.getAll().forEach((pokemon) => {
    pokemonRepo.addListItem(pokemon);
  });
});
