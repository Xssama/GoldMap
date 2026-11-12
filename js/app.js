import { GetGoldData, GetMetalHistory, GetSilverData, GetPreviousDayData } from "./api.js";
import { loadCard, loadMetalCrads } from "./render.js";
//console.log(await GetGoldData('MAD'));
// console.log(await GetSilverPrice_MAD());
//console.log(await GetMetalHistory("xau", "5d", "1d"));

//loadCard(await GetSilverData('MAD'))

const select_currency = document.getElementById('select-currency')
select_currency.addEventListener('change', async function()
{
    try {
        console.log(select_currency.value);
        
        await loadMetalCrads(select_currency.value)

    } catch (error) {
        console.log(error);
        
    }
})
// console.log(await GetPreviousDayData("xau", "MAD", 'gram'));

// console.log(await GetSilverData('MAD'));
