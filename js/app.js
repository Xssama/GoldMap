import { GetGoldData, GetMetalHistory, GetSilverData } from "./api.js";
import { loadCard, loadMetalCrads, LoadHistory, renderLineChart } from "./render.js";
import { CalculateJewelryPrice } from "./calculator.js";
//renderLineChart([{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}, {x: 7, y: 8}])
//console.log(await GetGoldData('MAD'));
// console.log(await GetSilverPrice_MAD());
//console.log(await GetMetalHistory("xau", "5d", "1d"));

//loadCard(await GetSilverData('MAD'))

// console.log(GetMetalHistory('xau',7));
// console.log(CalculateChartCoordinates(await GetMetalHistory('xau', 7)));
const refresh_cards = document.getElementById('refresh-cards')
refresh_cards.addEventListener('click', async function()
{
    await loadMetalCrads(select_currency.value)
})

const select_currency = document.getElementById('select-currency')
select_currency.addEventListener('change', async function()
{
    await loadMetalCrads(select_currency.value)
})
// console.log(await GetPreviousDayData("xau", "MAD", 'gram'));

// console.log(await GetSilverData('MAD'));



// LoadHistory(await GetMetalHistory('xau'))

const weigth_input = document.getElementById('weigth-input')
const weigth_input_error = document.getElementById('weigth-input-error')

const calculate_estimated_price = document.getElementById('calculate-estimated-price')
const valeur_estimee = document.getElementById('valeur-estimee')
calculate_estimated_price.addEventListener('click', async function(){
    if (!validateWeigth()) {
        valeur_estimee.textContent = '---'
        return
    }
    valeur_estimee.textContent = CalculateJewelryPrice(weigth_input.value, (await GetGoldData('MAD')).price)
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