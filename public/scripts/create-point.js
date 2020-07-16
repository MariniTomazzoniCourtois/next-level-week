function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then(states => {

      for( const state of states ) {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
                   
  })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  fetch(url)
  .then( res => res.json() )
  .then( cities => {

      for( const city of cities ) {
          citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      }

      citySelect.disabled = false  

               
  })
 

}

document.querySelector("select[name=uf]")
document.addEventListener("change", getCities)

// Itens de coleta
//pegar todos os li's
const itemsToCollet = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollet) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem (event) {
  const itemLi = event.target

  //add ou remover uma classe com js = toggle
  itemLi.classList.toggle("selected")

  const itemId =itemLi.dataset.id

  console.log('ITEM ID: ', itemId)
  //Verificar se existem items selecionados, se sim, pegar

  const alreadySelected = selectedItems.findIndex( function(item){
    const itemFound = item == itemId //isso será true or false
    return itemFound
  })
  //Se ja estiver selecionado, tirar da seleção
  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item =>{
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems
  } else {
      //se não, adicionar à seleção
      selectedItems.push(itemId)
  }

  //console.log('selectedItems')
  //atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems
}