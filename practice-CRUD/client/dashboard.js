document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#root');

    console.log('dom content loaded');

    fetch('/pokemon')
    .then(response => response.json())
    .then(data => {
        console.log("HELLO");
        console.log(data);

        for (const pokemon of data) {
            const div = document.createElement('div');
    
            const img = document.createElement('img');

            img.setAttribute('src', pokemon.sprite);
    
            var p = document.createElement("p");
            p.textContent += pokemon.name;

            var editBtn = document.createElement("button");
            editBtn.textContent += 'edit';
            // const pastName = pokemon.name;
            editBtn.addEventListener('click', (e) => openForm(e));
    
            div.appendChild(img);
            div.appendChild(p);
            div.appendChild(editBtn);


            root.appendChild(div);
        }
    })


    const generatePokemonBtn = document.querySelector('#pokemon');
    generatePokemonBtn.addEventListener('click', generatePokemon);
})

function generatePokemon() {
    const pokemonIndex = Math.floor(Math.random(0, 1) * 501);
    const imageURL =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

    const img = document.createElement('img');
    img.setAttribute('src', imageURL);

    // document.querySelector('#root').appendChild(img);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
    .then(response => response.json())
    .then(data => {

        const div = document.createElement('div');
        div.appendChild(img);

        var p = document.createElement("p");
        p.textContent += data.name;
        div.appendChild(p);

        var editBtn = document.createElement("button");
        editBtn.textContent += 'edit';
        div.appendChild(editBtn);
        // const pastName = data.name;
        editBtn.addEventListener('click', (e) => openForm(e));

        document.querySelector('#root').appendChild(div);

        fetch('/pokemon', {
            method: 'POST', 
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                sprite: imageURL
            })
        })
    })
}

function openForm(e) {
    const parent = e.target.parentElement;
    const pastName = parent.querySelector('p').textContent;

    console.log('parent', parent);
    console.log('past name', pastName);

    const changeNames = document.querySelector('form');
    changeNames.style.display = "block";
    const pastNameInput = changeNames.querySelector('#pastName');
    pastNameInput.value = pastName;

    changeNames.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch('/pokemon', {
            method: 'PATCH', 
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                pastName: pastName,
                newName: changeNames.querySelector('#newName').value
            })
        })
    })
}

