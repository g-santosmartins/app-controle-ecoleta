// integração da API que temos com o IBGE para buscar os estados: 
// Será muito usada em sites no futuro 

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {


            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}
// chamando a função para o fim 
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    // pegando os valores de index dos estados para posicionar
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    // recuperando agora os muninicipios para o input
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = false

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            // adiciona o conteudo
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}




// Aqui fizemos um listener para avisar quando o campo é mudado
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    // adicionar ou remover classe com o JS
    itemLi.classList.toggle("selected")


    const itemId = event.target.dataset.id

    // Logica
    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(function (item) {
        const itemFound = item == itemId // isso dá true ou false
        return itemFound
    })
    // ou 
    // const alreadySelected = selectedItems.findIndex(item => {
    //     item == itemId
    // })
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
            // quando retorna falso, deve ser removido
        })
        selectedItems = filteredItems
    } else {
        // se não tiver selecionado, adicionar

        //se já estiver selecionado, tirar a seleção

        // se não estiver adicionar na seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os dados selecionados

    collectedItems.value = selectedItems


}


