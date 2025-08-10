const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMoreButton")

const maxRecords = 151
const limit = 50
let offset = 0


/* versões e simplificações da função fetch
//----------primeira versão----------
fetch(url)  //Vai chamar o fetch, o fetch vai processar, e se der tudo certo ele retornara um response (promise). A resposta não é de imediato, pode demorar
    .then(function (response){
        response.json()
        .then(function(jsonBody){
            console.log(jsonBody)
        })
    })
    .catch(function (error){
        console.error(error)
    })
    .finally(function (){
        console.log("Requisição concluida")
    })

//----------primeira simplificação----------
fetch(url)
    .then(function (response){
        return response.json() 
    })
    .then(function(jsonBody){
        console.log(jsonBody)
    })
    .catch(function (error){
        console.error(error)
    })
    .finally(function (){
        console.log("Requisição concluida")
    })

//----------segunda simplificação---------
fetch(url)  
    .then((response) =>{
        return response.json() 
    })
    .then((jsonBody) =>{
        console.log(jsonBody)
    })
    .catch((error)=>{
        console.error(error)
    })
    .finally(()=>{
        console.log("Requisição concluida")
    })
    //=> é usado em funções especiais, que não precisam ser declarada como quando se usa function + nome + (parametro){}
    //usado em callback e contextos isolados
    //se o retorno tiver apenas uma linha, não é preciso declarar o corpo da função
*/

function loadPokemonItens(offset, limit){
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) =>`
                <li class="pokemon ${pokemon.type}">    
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')} 
                        </ol>
                        <img src="${pokemon.image}" alt="${pokemon.name}">
                    </div>
                </li>
            `).join('')
    })
}

    /*segunda versao
    const newList = pokemons.map((pokemon) => {
        return convertPokemonToHtml(pokemon)
    })

    const newHTML = newList.join('')

    pokemonList.innerHTML += newHTML */

    /* primeira versão
    //const listItems = []
    //for (let i = 0; i < pokemons.length; i++) {
    //    const pokemon = pokemons[i];
    //    listItems.push(convertPokemonToHtml(pokemon))
    //}
    //console.log(listItems)*/

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener("click", () => { 
    offset += limit

    const qtdRecordNextPage = offset+limit
    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset 
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
})

