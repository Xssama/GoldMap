const API_URL = "https://xaus.com/api/v1";

async function requestJSON(url) {
    const response = await fetch(url)
    if (!response.ok)
    {
        throw new Error(`HTTP Error! status: ${response.status}`)
    }
    const data_json = await response.json()
    return data_json
}
async function GetPreviousDayData(metal, unit, fxRate) {

    const history_data = await requestJSON(`${API_URL}/chart?symbol=${metal}&range=5d`)
    
    let previousprice = history_data.points[history_data.points.length - 2].c
    return (previousprice * fxRate) / 31.1035   
}

async function GetGoldData(currency) {
   
    const gold_data = await requestJSON(`${API_URL}/spot?currency=${currency}&unit=gram`)

    const previousDayPrice = await GetPreviousDayData('xau', 'gram', gold_data.fx_rate)
    const change = gold_data.xau.price - previousDayPrice

    
    const changeRate = (change / previousDayPrice) * 100

    
    return {name: "Gold", price: gold_data.xau.price.toFixed(2), currency: gold_data.xau.currency, unit: "Gramme", change: change.toFixed(2), changerate: changeRate.toFixed(2)}
}

async function GetSilverData(currency) {
    
    const silver_data = await requestJSON(`${API_URL}/spot?currency=${currency}&unit=gram`)
    const silverPrice = (silver_data.silver_usd_oz * silver_data.fx_rate)/31.1034768

    const previousDayPrice = await GetPreviousDayData('silver', 'gram', silver_data.fx_rate)
    
    const change = silverPrice - previousDayPrice
    const changeRate = (change / previousDayPrice) * 100

    return {name: "Silver", price: silverPrice.toFixed(2), currency: silver_data.xau.currency, unit: "Gramme", change: change.toFixed(2), changerate: changeRate.toFixed(2)}
}

async function GetMetalHistory(symbol, range = '') {
    const goldHistory = await requestJSON(`${API_URL}/chart?symbol=${symbol}&range=1mo&interval=1d`)
    const spotData = await requestJSON(`${API_URL}/spot?currency=MAD&unit=gram`)
    const fxrate = spotData.fx_rate

    const data = []
    goldHistory.points.forEach(function(DayData){
        data.push({dayDate: new Date(DayData.t * 1000).toISOString().slice(0, 10), ClosePrice: (DayData.c * fxrate) / 31.1034768}) 
    })
    
    return (range == 7 ?  data.slice(-7): data)    
}
export {GetGoldData, GetSilverData, GetMetalHistory}
