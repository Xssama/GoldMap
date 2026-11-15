
import { returnMetalPrice } from "./storage.js";
import { loadMetalCrads, LoadHistory, renderPage } from "./render.js";
import { CalculateJewelryPrice } from "./calculator.js";
import { state } from "./state.js";

// renderPage()

//Cards rendring functions
const refresh_cards = document.getElementById('refresh-cards')
refresh_cards.addEventListener('click', async function()
{
    await loadMetalCrads(state.mizan_currency)
})

const select_currency = document.getElementById('select-currency')
select_currency.addEventListener('change', async function()
{
    await loadMetalCrads(select_currency.value)
})

//estimated calculation of metals functios
const weigth_input = document.getElementById('weigth-input')
const weigth_input_error = document.getElementById('weigth-input-error')

const calculate_estimated_price = document.getElementById('calculate-estimated-price')
const valeur_estimee = document.getElementById('valeur-estimee')
const valeur_estimee_currency = document.getElementById('valeur-estimee-currency')
const calculation_select_metal = document.getElementById('calculation-select-metal')
calculate_estimated_price.addEventListener('click', async function(){
    if (!validateWeigth()) {
        valeur_estimee.textContent = '---'
        return
    }
    const selected_metal = calculation_select_metal.value
    valeur_estimee.textContent = CalculateJewelryPrice(weigth_input.value, returnMetalPrice(selected_metal))
    valeur_estimee_currency.textContent = state.mizan_currency
})
function validateWeigth()
{
    const weigth_str = weigth_input.value
    const weigth = parseFloat(weigth_str)

    if (Number.isNaN(weigth) || weigth < 0) {
        weigth_input_error.textContent = 'la poids entrée n\'est pas valide'
        weigth_input_error.classList.remove('hidden')
        return false
    }
    else
    {
        weigth_input_error.textContent = ''
        weigth_input_error.classList.add('hidden')
        return true
    }
}

weigth_input.addEventListener('focusout', validateWeigth)