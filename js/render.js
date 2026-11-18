import { GetGoldData, GetSilverData, GetMetalHistory } from "./api.js";
import {LoadData, UpdateGoldPrice, UpdateSelectedCurrency, UpdateSilverPrice } from "./storage.js";
import { renderLineChart, CalculateChartCoordinates } from "./charts.js";

const LastUpdate_P = document.getElementById('last-update-time')
const template = document.getElementById('metals-template')
const cards_containers = document.getElementById('metals-container')

const cards_status_P = document.getElementById('cards-status')
const refresh_cards = document.getElementById('refresh-cards')
const refresh_textcontent = document.getElementById('refresh-textcontent')
const history_status_p = document.getElementById('history-status')

async function renderPage() {
    const currentDate = new Date()
    renderLastUpdatelabel(currentDate)
    const mizan_currency = LoadData()
    document.getElementById('select-currency').value = mizan_currency
    await loadMetalCrads(mizan_currency)
    LoadHistory()
}
export function loadCard(Card_Obj)
{
    const card = template.content.cloneNode(true)
    const metalName = Card_Obj.name
    
    const isGold = (metalName).trim().toLowerCase() == 'gold'
    console.log(isGold);
    card.querySelector('#metal-name').textContent = Card_Obj.name
    
    card.querySelector('#metal-color').classList.add(isGold ? 'gold-circle' : 'silver-circle')
    card.querySelector('#metal-price').textContent = Card_Obj.price
    card.querySelector('#metal-currency').textContent = Card_Obj.currency
    card.querySelector('#metal-unit').textContent = Card_Obj.unit
    card.querySelector('#metal-change').textContent = Card_Obj.change + ` ${Card_Obj.currency}`
    card.querySelector('#metal-change-rate').textContent = Card_Obj.changerate + ' %'

    if (Card_Obj.changerate < 0) {
        card.querySelector('#metal-change-rate').classList.add('text-red-500')
        card.querySelector('.arrow-down').classList.remove('hidden')
        card.querySelector('.arrow-up').classList.add('hidden')
    }
    else if (Card_Obj.changerate >= 0) {
        card.querySelector('#metal-change-rate').classList.add('text-green-500')
        card.querySelector('.arrow-up').classList.remove('hidden')
        card.querySelector('.arrow-down').classList.add('hidden')
   
    }

    cards_containers.appendChild(card)

}
async function loadMetalCrads(currency)
{
    cards_containers.replaceChildren()
    cards_status_P.textContent = "Loading..."
    cards_status_P.className = "loading"
    refresh_cards.disabled = true
    try
    {
        const [GoldData, SilverData] = await Promise.all([GetGoldData(currency), GetSilverData(currency)]) 
        
        const currentDate = new Date()
        renderLastUpdatelabel(currentDate)
        cards_status_P.textContent = ""
        cards_status_P.className = ""

        UpdateGoldPrice(GoldData.price)
        UpdateSilverPrice(SilverData.price)
        UpdateSelectedCurrency(currency)
        loadCard(GoldData)
        loadCard(SilverData)
        
        refresh_textcontent.textContent = "Actualiser"

    }

    catch (error)
    {
        cards_status_P.textContent = error.message
        cards_status_P.className = "error"
        refresh_textcontent.textContent = "Reessayer"
    }
    refresh_cards.disabled = false
}




function renderLastUpdatelabel(date)
{
    if (Number.isNaN(date.getTime())) {
        return;
    }
    LastUpdate_P.textContent = date.toLocaleString()
}


async function LoadHistory(symbol='xau', range='') {
    const chart_element = document.getElementById('history-chart') 
    chart_element.replaceChildren()

    history_status_p.textContent = "Loading..."
    history_status_p.className = "loading"
    try {
        const points = await GetMetalHistory(symbol, range)
        const prices = []
        points.forEach(function(point) {
            prices.push(point.ClosePrice)
        })
        
        const PointsCoordinates = CalculateChartCoordinates(prices)
        
        renderLineChart(chart_element, PointsCoordinates.pointsCorrdinates)
        history_status_p.textContent = ""
        history_status_p.className = "loading"
    
    } catch (error) {
        history_status_p.textContent = "Une erreur est survenue de notre côté."
        history_status_p.className = "error"
    }
}



export {loadMetalCrads, LoadHistory , renderPage }