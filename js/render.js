import { GetGoldData, GetSilverData, GetMetalHistory } from "./api.js";

const template = document.getElementById('metals-template')
const cards_containers = document.getElementById('metals-container')

const cards_status_P = document.getElementById('cards-status')

function loadCard(Card_Obj)
{
    const card = template.content.cloneNode(true)
    
    card.querySelector('#metal-name').textContent = Card_Obj.name
    card.querySelector('#metal-price').textContent = Card_Obj.price
    card.querySelector('#metal-currency').textContent = Card_Obj.currency
    card.querySelector('#metal-unit').textContent = Card_Obj.unit
    card.querySelector('#metal-change').textContent = Card_Obj.change
    card.querySelector('#metal-change-rate').textContent = Card_Obj.changerate


    cards_containers.appendChild(card)

}
async function loadMetalCrads(currency)
{
    cards_containers.replaceChildren()
    cards_status_P.textContent = "Loading..."
    cards_status_P.className = "loading"

    try
    {
        const GoldData = await GetGoldData(currency)
        console.log(GoldData);
        
        loadCard(GoldData)

        const SilverData = await GetSilverData(currency)
        console.log(SilverData);
        
        loadCard(SilverData)

        cards_status_P.textContent = ""
        cards_status_P.className = ""
    }
    catch (error)
    {
        cards_status_P.textContent = error
        cards_status_P.className = "error"
    }
}

export {loadCard, loadMetalCrads}