const API_URL = "https://xaus.com/api/v1";

async function GetPreviousDayData(metal, currency, unit) {
    const [chartResp, spotRep] = await Promise.all([fetch(`${API_URL}/chart?symbol=${metal}&range=5d`), fetch(`${API_URL}/spot?currency=${currency}&unit=${unit}`)]) 
    if (!chartResp.ok || !spotRep.ok) {
        throw new Error('HTTP error: ', chartResp)
    }

    const history_data = await chartResp.json()
    const spot_data = await spotRep.json()
    
    let previousprice = history_data.points[history_data.points.length - 2].c
    return (previousprice * spot_data.fx_rate) / 31.1035   
}

export {GetPreviousDayData}
async function GetGoldData(currency) {
    const data = await fetch(`${API_URL}/spot?currency=${currency}&unit=gram`)
    
    if (!data.ok) {
        throw new Error('HTTP error: ', data.status)
    }
    const data_json = await data.json()

    const previousDayPrice = await GetPreviousDayData('xau', currency, 'gram')
    const change = data_json.xau.price - previousDayPrice

    
    const changeRate = (change / previousDayPrice) * 100

    
    return {name: "Gold", price: data_json.xau.price.toFixed(2), currency: data_json.xau.currency, unit: "Gramme", change: change.toFixed(2), changerate: changeRate.toFixed(2)}
}

async function GetSilverData(currency) {
    const data = await fetch(`${API_URL}/spot?currency=${currency}&unit=gram`)
    
    if (!data.ok) {
        throw new Error('HTTP error: ', data.status)
    }
    const data_json = await data.json()
    const silverPrice = (data_json.silver_usd_oz * data_json.fx_rate)/31.1034768

    const previousDayPrice = await GetPreviousDayData('silver', currency, 'gram')
    
    const change = silverPrice - previousDayPrice
    const changeRate = (change / previousDayPrice) * 100

    return {name: "Silver", price: silverPrice.toFixed(2), currency: data_json.xau.currency, unit: "Gramme", change: change.toFixed(2), changerate: changeRate.toFixed(2)}
}

async function GetMetalHistory(symbol, range, interval) {
    const [SpotRes, HistoryRes] = await Promise.all([fetch(`${API_URL}/spot?currency=MAD&unit=gram`),
         fetch(`${API_URL}/chart?symbol=${symbol}&range=${range}&interval=${interval}`)])
    if (!SpotRes.ok || ! HistoryRes.ok) {
        throw new Error('HTTP error! failed to retreive the data.')
        return
    }

    const goldHistory = await HistoryRes.json()

    
    const spotData = await SpotRes.json()
    const fxrate = spotData.fx_rate

    const data = []
    goldHistory.points.forEach(function(DayData){
        data.push({dayDate: new Date(DayData.t * 1000).toISOString().slice(0, 10), ClosePrice: (DayData.c * fxrate) / 31.1034768}) 
    })
    
    return data    
}
export {GetGoldData, GetSilverData, GetMetalHistory}
