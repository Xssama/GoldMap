import { state } from "./state.js";
const providedCurenciesInAPP = ['USD', 'MAD', 'EUR']
const storage_key = 'currency'
export function LoadData(Key = storage_key)
{
    const data = localStorage.getItem(Key) || 'MAD'
    if (!providedCurenciesInAPP.includes(data)) {
        data = 'MAD'
    }
    state.mizan_currency = data
    console.log(state.mizan_currency);
    
     
}

export function SetData(data_obj = state, key = storage_key)
{
    localStorage.setItem(key, data_obj.mizan_currency)
}

export function UpdateSelectedCurrency(selected_currency)
{
    if (!providedCurenciesInAPP.includes(selected_currency)) {
        return {
            success: false,
            error: 'provided currency isn\'t valid!'
        }
    }
    state.mizan_currency = selected_currency
    return saveData()
}
export function UpdateGoldPrice(currentPrice)
{
    if (Number.isNaN(currentPrice) || currentPrice < 0) {
        return {
            success: false,
            error: 'provided price isn\'t valid!'
        }
    }
    state.current_prices.Gold = currentPrice
    return {
        success: true,
        error: null,
    }
}
export function UpdateSilverPrice(currentPrice)
{
    if (Number.isNaN(currentPrice) || currentPrice < 0) {
        return {
            success: false,
            error: 'provided price isn\'t valid!'
        }
    }
    state.current_prices.Silver = currentPrice
    return {
        success: true,
        error: null,
    }
}
export function saveData(data=state)
{
    try {
        SetData(data)
        return {
            success: true,
            error: null
        }
    } catch (error) {
        return {success: false,
        error: error.message}
    }
}