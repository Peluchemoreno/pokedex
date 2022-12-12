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

function printArrayDetails() {
    //This for loop iterates over each item in my pokemonList array
    for (i = 0; i < pokemonList.length; i++) {
        //This if statement checks whether the height of each iteration exceedes 1m
        //in height and displays a message if the height exceedes 1m
        if (pokemonList[i].height > 1) {
            document.write(`<div class="new-item">${pokemonList[i].name} (height: ${pokemonList[i].height}) WOW THAT'S BIG </div>`);
        } else {
            document.write(`<div class="new-item">${pokemonList[i].name} (height: ${pokemonList[i].height})</div>`);
        }
    }
}

printArrayDetails();

//---------------------------------

function div(dividend, divisor) {
    if (divisor === 0) {
        alert("you are trying to divide by 0")
    } else {
        return dividend / divisor
    }
}
